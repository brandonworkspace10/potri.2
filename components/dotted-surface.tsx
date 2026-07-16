"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SEPARATION = 150;
const AMOUNTX = 40;
const AMOUNTY = 60;

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
export function DottedSurface({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    // Fog has to match the page background — white fog would halo the far dots
    // against a near-black page instead of letting them recede into it.
    scene.fog = new THREE.Fog(0x0a0b0d, 1600, 5200);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
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

    const total = AMOUNTX * AMOUNTY;
    const positions: number[] = [];
    const colors: number[] = [];
    // Per-dot flare state. Each picked dot gets its own phase and speed so the
    // field twinkles instead of pulsing in unison.
    const flares = new Uint8Array(total);
    const phase = new Float32Array(total);
    const rate = new Float32Array(total);

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
        );
        // three.js colour channels are 0–1; 0–255 values clamp to pure white
        colors.push(...BASE_COLOUR);
      }
    }

    for (let i = 0; i < total; i++) {
      if (Math.random() >= FLARE_RATIO) continue;
      flares[i] = 1;
      phase[i] = Math.random() * Math.PI * 2;
      rate[i] = 0.25 + Math.random() * 0.55;
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
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          array[i * 3 + 1] =
            Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
    };

    const flare = (t: number) => {
      for (let i = 0; i < total; i++) {
        if (!flares[i]) continue;
        // sin raised to a power sits near zero most of the cycle and spikes
        // briefly — a blink rather than a throb
        const s = Math.pow(Math.max(0, Math.sin(t * rate[i] + phase[i])), FLARE_SHARPNESS);
        const j = i * 3;
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

    return () => {
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
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
