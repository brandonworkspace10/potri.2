"use client";

import { useEffect, useRef } from "react";

// Kick the three.js chunk off at module evaluation so the download and parse
// run in parallel with hydration. Waiting for the effect serialized them:
// hydrate -> fetch -> parse -> first frame, which on a phone was ~2s of blank.
const threeImport = import("@/lib/three-subset");

const SEPARATION = 150;
const AMOUNTX = 40;
const AMOUNTY = 60;

/** Under this container width, run the phone profile: fewer dots, lower dpr. */
const MOBILE_WIDTH = 640;

/**
 * Wave phase advanced per second. Time-based rather than per-frame so the
 * speed is identical on 60Hz and 120Hz displays.
 */
const WAVE_SPEED = 1.8;

/** Cap the frame delta so resuming from a pause eases in instead of jumping. */
const MAX_DELTA = 1 / 30;

/** Resting dot colour. */
const BASE_COLOUR: [number, number, number] = [0.5, 0.52, 0.56];

/** Share of dots that flare in the brand colour. */
const FLARE_RATIO = 0.3;

/** Shapes the flare curve — higher is a briefer, sharper blink than a pulse. */
const FLARE_SHARPNESS = 4;

/**
 * Peak brightness multiplier. Plain amber has roughly the same luminance as the
 * resting grey, so a dot would change hue without ever looking like it lit up.
 * Vertex colours may exceed 1 — the shader clamps after alpha — so overshooting
 * is what actually makes it read as a flare.
 */
const FLARE_BOOST = 1.6;

/** three.js colour channels are 0–1, CSS tokens are hex. */
function hexToRgb01(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 0xff) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

/**
 * Animated dot-wave field for the hero backdrop.
 * Scoped to its positioned parent — it is not a page-wide fixed layer.
 */
export function DottedSurface({
  className = "",
  placeholderSrc,
}: {
  className?: string;
  /** static image of the field's first frame, painted by CSS before any JS runs */
  placeholderSrc?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // three.js is ~170KB gzipped — load it after hydration instead of shipping
    // it in the route bundle. A backdrop arriving a beat late costs nothing;
    // main-thread weight on first load does.
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
    const THREE = await threeImport;
    if (disposed || !containerRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    // Fog has to match the page background — white fog would halo the far dots
    // against a near-black page instead of letting them recede into it.
    scene.fog = new THREE.Fog(0x0a0b0d, 1600, 5200);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Phones pay for every fragment and every per-frame sin(): halve the grid
    // and cap dpr harder. The dots sit behind a fog fade — the difference is
    // invisible, the fill cost is not.
    const mobile = width < MOBILE_WIDTH;
    const amountX = mobile ? 28 : AMOUNTX;
    const amountY = mobile ? 42 : AMOUNTY;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 0.45s ease";
    container.appendChild(renderer.domElement);

    // Read the brand colour from the design token so the flare can't drift
    // from the rest of the palette.
    const flareColour =
      hexToRgb01(
        getComputedStyle(document.documentElement).getPropertyValue("--color-brand"),
      ) ?? [1, 0.5412, 0.2039];
    const peak: [number, number, number] = [
      flareColour[0] * FLARE_BOOST,
      flareColour[1] * FLARE_BOOST,
      flareColour[2] * FLARE_BOOST,
    ];

    const total = amountX * amountY;
    const positions: number[] = [];
    const colors: number[] = [];
    // Per-dot flare state, stored compactly: only the chosen dots are visited
    // per frame instead of scanning the whole grid for a flag.
    const flareIdx: number[] = [];
    const phase: number[] = [];
    const rate: number[] = [];

    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions.push(
          ix * SEPARATION - (amountX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (amountY * SEPARATION) / 2,
        );
        // three.js colour channels are 0–1; 0–255 values clamp to pure white
        colors.push(...BASE_COLOUR);
      }
    }

    for (let i = 0; i < total; i++) {
      if (Math.random() >= FLARE_RATIO) continue;
      flareIdx.push(i);
      phase.push(Math.random() * Math.PI * 2);
      rate.push(0.25 + Math.random() * 0.55);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const positionAttribute = geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    const colourAttribute = geometry.attributes.color;
    const colourArray = colourAttribute.array as Float32Array;

    let count = 0;
    let elapsed = 0;
    let frameId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const wave = () => {
      let i = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          array[i * 3 + 1] =
            Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
    };

    const flare = (t: number) => {
      for (let k = 0; k < flareIdx.length; k++) {
        // sin raised to a power sits near zero most of the cycle and spikes
        // briefly — a blink rather than a throb
        const s = Math.pow(Math.max(0, Math.sin(t * rate[k] + phase[k])), FLARE_SHARPNESS);
        const j = flareIdx[k] * 3;
        colourArray[j] = BASE_COLOUR[0] + (peak[0] - BASE_COLOUR[0]) * s;
        colourArray[j + 1] = BASE_COLOUR[1] + (peak[1] - BASE_COLOUR[1]) * s;
        colourArray[j + 2] = BASE_COLOUR[2] + (peak[2] - BASE_COLOUR[2]) * s;
      }
      colourAttribute.needsUpdate = true;
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), MAX_DELTA);
      elapsed += dt;
      count += dt * WAVE_SPEED;
      wave();
      flare(elapsed);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.getDelta(); // drop the idle time so the wave resumes where it paused
      animate();
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    };

    if (reduced) {
      // honour the OS setting: draw the field once, hold it still
      wave();
      flare(0);
      renderer.render(scene, camera);
    } else {
      start();
    }
    // First frame exists — crossfade: live canvas in, static stand-in out.
    renderer.domElement.style.opacity = "1";
    if (placeholderRef.current) placeholderRef.current.style.opacity = "0";

    // No reason to burn a rAF loop while the hero is scrolled off screen
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(container);

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    });
    ro.observe(container);

    cleanup = () => {
      // cancel the live frame id, not one captured at setup — otherwise the
      // loop survives unmount and keeps rendering forever
      cancelAnimationFrame(frameId);
      io.disconnect();
      ro.disconnect();
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {placeholderSrc ? (
        // Slightly blurred so the swap to the live canvas (whose framing shifts
        // with the viewport's aspect) reads as focus, not a jump.
        <div
          ref={placeholderRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${placeholderSrc})`,
            filter: "blur(2px)",
            scale: "1.03",
            transition: "opacity 0.45s ease",
          }}
        />
      ) : null}
    </div>
  );
}
