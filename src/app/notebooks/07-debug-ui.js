import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import createCanvas from "../helpers/create-canvas";
import gsap from "gsap";

/**
 * Debug
 */

const gui = new dat.GUI({width: 400});
const parameters = {
  color: 0x3ba9b7,
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 1 });
  },
};

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
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");

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
