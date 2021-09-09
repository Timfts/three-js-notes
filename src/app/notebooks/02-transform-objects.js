import * as THREE from "three";
import createCanvas from "../helpers/create-canvas";

const scene = new THREE.Scene();
/**
 * There are 4 properties to transform objects
 * - position
 * - scale
 * - rotation
 * - quaternion
 *
 * (all classes that inherit from Object3D have them, such as PerspectiveCamera and Mesh)
 *
 */

/**
 * The 'unit' measure is arbitrary
 */

/**
 * position is an object that inherits from Vector3, it is a vector.
 */

// Objects
const canvas = createCanvas("transform-objects");
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

// -------- position ------------
mesh.position.z = 0.7;
mesh.position.x = 1;
mesh.position.y = -1;
//Its possible to set x,y,z on the same time using the set method
mesh.position.set(1, -1, 0);

// -------- scale --------------
mesh.scale.x = 0.5;
mesh.scale.y = 2;
mesh.scale.z = 0.5;
mesh.scale.set(1, 1, 1);

// --------- rotation ----------
/**  also have x,y,z but its not a Vector3 but a Euler, made to do rotations */
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
/**
 * Euler can be problematic, most engines and 3d softwares use Quaternion instead
 */



scene.add(mesh);

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Render
const camera = new THREE.PerspectiveCamera(75, 800 / 600);
camera.position.z = 3;
// camera.position.y = 1;
//camera.position.x = 1; 
// camera.lookAt(mesh.position)

/**
 * distance between the camera and the object
 */
console.log(mesh.position.distanceTo(camera.position));

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(800, 600);
renderer.render(scene, camera);
