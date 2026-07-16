"use client";

import { useEffect, useRef } from "react";

const GAP = 0.3;
const AMOUNT_X = 160;
const AMOUNT_Y = 160;

/** Wave phase per second — time-based so it matches on 60Hz and 120Hz. */
const WAVE_SPEED = 0.7;
const MAX_DELTA = 1 / 30;

/** three.js colour channels are 0–1, CSS tokens are hex. */
function tokenColour(name: string, fallback: [number, number, number]): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#?([0-9a-f]{6})$/i.exec(raw);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 0xff) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

const VERTEX = /* glsl */ `
  attribute float scale;
  uniform float uTime;
  varying float vBand;

  void main() {
    vec3 p = position;
    float s = scale;
    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mvPosition;

    // Band by SCREEN x, not world x. The field is far wider than the frustum,
    // so a world-space band would put a single colour across the whole view.
    vBand = (clip.x / clip.w) * 0.5 + 0.5;

    gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
    gl_Position = clip;
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;
  varying float vBand;

  void main() {
    // three columns of cards sit above this — blend the identity colours to
    // line up beneath them
    vec3 c = mix(uColorA, uColorB, smoothstep(0.12, 0.5, vBand));
    c = mix(c, uColorC, smoothstep(0.5, 0.88, vBand));
    gl_FragColor = vec4(c, uOpacity);
  }
`;

/**
 * Particle wave for the team section, tinted across its width with the three
 * agents' colours so each column sits over its own hue.
 * Scoped to its positioned parent — not a page-wide fixed layer.
 */
export function ParticleWave({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Deferred for the same reason as the hero field: the wave is decoration,
    // three.js is the heaviest dependency on the page.
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
    const THREE = await import("three");
    if (disposed || !containerRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.set(0, 6, 5);

    const scene = new THREE.Scene();

    // alpha + a transparent clear colour: without these the canvas paints an
    // opaque plate over the section behind it
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const count = AMOUNT_X * AMOUNT_Y;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions[i] = ix * GAP - (AMOUNT_X * GAP) / 2;
        positions[i + 1] = 0;
        // centred on AMOUNT_Y — the original divided by amountX here, which
        // offsets the field the moment the two differ
        positions[i + 2] = iy * GAP - (AMOUNT_Y * GAP) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.55 },
        uColorA: { value: new THREE.Vector3(...tokenColour("--color-andy", [1, 0.5412, 0.2039])) },
        uColorB: { value: new THREE.Vector3(...tokenColour("--color-randy", [0.302, 0.5529, 1])) },
        uColorC: { value: new THREE.Vector3(...tokenColour("--color-alyssa", [0.2078, 0.7843, 0.5412])) },
      },
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.lookAt(scene.position);

    let frameId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const render = () => renderer.render(scene, camera);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      material.uniforms.uTime.value +=
        Math.min(clock.getDelta(), MAX_DELTA) * WAVE_SPEED;
      render();
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.getDelta();
      animate();
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    };

    if (reduced) render();
    else start();

    // 25k particles is not something to run while the section is off screen
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
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
      render();
    });
    ro.observe(container);

    cleanup = () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      ro.disconnect();
      scene.remove(particles);
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
    />
  );
}
