import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function createCar() {
  function createWheels() {
    const geometry = new THREE.BoxGeometry(6, 6, 16.5);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }
  const car = new THREE.Group();

  const backWheel = createWheels();
  backWheel.position.y = 3;
  backWheel.position.x = -9;
  car.add(backWheel);

  const frontWheel = createWheels();
  frontWheel.position.y = 3;
  frontWheel.position.x = 9;
  car.add(frontWheel);

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(30, 7.5, 15),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );
  main.position.y = 6;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(16.5, 6, 12),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  cabin.position.x = -3;
  cabin.position.y = 12.75;
  car.add(cabin);
  car.rotation.y= Math.PI/2;
  return car;
}
