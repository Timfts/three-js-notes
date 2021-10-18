// what is a geometry

/**
 *  - composed of vertices (point cordinates in 3d spaces) and faces
 * - Can be used for meshes but also for particles
 *  - Can store more data than the positions (UV coordinates, normals, colors or anything we want)
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createCanvas from "../helpers/create-canvas";

const getLimitedPixelRatio = () => Math.min(window.devicePixelRatio, 2);

/**
 * Cursor
 *
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Updating viewport
 */
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(getLimitedPixelRatio());
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullScreenElement;

  if (!fullscreenElement) {
    fullscreenElement
      ? canvas.requestFullscreen()
      : canvas.webkitRequestFullScreen();
  } else {
    fullscreenElement
      ? document.exitFullscreen()
      : document.webkitExitFullscreen();
  }
});

const canvas = createCanvas("camera-canvas");

// ---- Scene
const scene = new THREE.Scene();

// ------ Geometry
/* const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3); */

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5;
}

const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttributes);
const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

// ----- Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// ----- Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

const aspectRatio = sizes.width / sizes.height;
const cameraOrt = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
);
cameraOrt.position.z = 2;
cameraOrt.position.y = 2;
cameraOrt.position.x = 2;
cameraOrt.lookAt(mesh.position);

// ------ Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(getLimitedPixelRatio());

function tick() {
  //Update controls
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
