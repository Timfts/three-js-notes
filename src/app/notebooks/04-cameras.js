/**
 * Camera is an abstract class in THREE.js
 */

/**
 * ArrayCamera - can be used we we have multiple views in the same screen, like
 * a local multiplayer game
 */

/**
 * StereoCamera, render the scene through two camera two cameras that mimic the eyes
 * to create a parallax effect
 *
 */

/**
 * Cube camera - do 6 renders, each one facing a different direction
 * can render the surrounding for things like environment map, reflection or shadow map
 *
 * used in VR
 */

/**
 *  orthographic camera
 *
 * Render the scene without perspective
 *
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createCanvas from "../helpers/create-canvas";

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
  width: 800,
  height: 600,
};

const canvas = createCanvas("camera-canvas");

// ---- Scene
const scene = new THREE.Scene();

// ----- Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// ----- Perspective Camera
/**
 * First parameter - FOV - in degs (keep between 45 - 75)
 * Second Param - Aspect ratio
 *
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3; 
camera.lookAt(mesh.position);
scene.add(camera);

/** Controls */
/**
 * When to use built ins controls
 * - if they have the features you need, they have some limitaions though
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

//OrtographicCamera
/**
 * Ortographic camera differs from PerspectiveCamera by its lack of
 * perspective
 *
 * Objects has the same size regardless of their distance to the camera
 *
 */
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
/* scene.add(cameraOrt); */

// ------ Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();
  /* mesh.rotation.y = elapsedTime; */
  /* camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = Math.sin(cursor.y * Math.PI * 2) * 3; 
  camera.lookAt(mesh.position);*/

  //Update controls
  controls.update()
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
