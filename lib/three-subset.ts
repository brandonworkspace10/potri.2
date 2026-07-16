/**
 * Named re-exports of exactly what the backdrops use. A dynamic
 * import("three") hands the bundler an opaque namespace it cannot tree-shake;
 * importing through this module keeps the usage statically analyzable, so the
 * lazy chunk carries only these classes instead of all of three.js.
 */
export {
  BufferAttribute,
  BufferGeometry,
  Clock,
  Float32BufferAttribute,
  Fog,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
