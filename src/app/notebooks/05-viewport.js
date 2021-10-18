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
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

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
renderer.setPixelRatio(getLimitedPixelRatio());

function tick() {
  //Update controls
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();

/**
 * Pixel ratio
 * computers with a pixel ration greater than 1 can see a blur effect
 *
 *
 * the pixel ratio corresponds to how many physiscal pixels you have
 * on the screen for one pixel unit on the software part
 *
 * highest pixel ratios are usually on the weakes devices mobiles
 */
