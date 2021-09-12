/**
 * Animating in three.js is like making stop motion
 * We need to change a object and call window.requestAnimationFrame each time
 *
 * The purpose of requestAnimation frame is to call a function on
 * the next frame, not exatcly to create animations
 *
 */

import * as THREE from "three";
import gsap from "gsap"
import createCanvas from "../helpers/create-canvas";


const sizes = {
  width: 800,
  height: 600,
};

// ----- Canvas
const canvas = createCanvas("first-example");

// ---- Scene
const scene = new THREE.Scene();

// ----- Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// ----- Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3; // 3 units

// ------ Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// ------ Animations
function tick() {
  // update objects
  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
/**
 * The problem with this code is:
 * With a bigger framerate, faster will be the animation
 * With a slower framerate, slower will be the animation
 *
 * And a animation should be always the same, regardless the framerate
 */
/* tick(); */

let time = Date.now();
function timedTick() {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  mesh.rotation.y += 0.001 * deltaTime;
  mesh.rotation.x += 0.001 * deltaTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(timedTick);
}

/* timedTick() */

/**
 * Tick using clock solution
 */
const clock = new THREE.Clock();

function clockTick() {
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);
  mesh.position.x = Math.cos(elapsedTime);

  renderer.render(scene, camera);
  window.requestAnimationFrame(clockTick);
}

/* clockTick(); */

/**
 * Using a library
 * To have more control over the animations, like create
 * tweens, timelines, etc. third party libraries like GSAP are the best. 
 */

gsap.to(mesh.position, {
  x: 2,
  duration: 1,
  delay: 1,
})

gsap.to(mesh.position, {
  x: 0,
  duration: 1,
  delay: 2,
})

function gsapTick(){
  renderer.render(scene, camera);
  window.requestAnimationFrame(gsapTick);
}

gsapTick()