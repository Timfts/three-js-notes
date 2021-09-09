import * as THREE from "three";
import createCanvas from "../helpers/create-canvas"

const sizes = {
  width: 800,
  height: 600,
};
const canvas = createCanvas("first-example")

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });

// mesh is composed of geometry + material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3 // 3 units

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)