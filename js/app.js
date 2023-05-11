import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import addTrack from "./../js/track.js";
import createCar from "./../js/car.js";
import { Clock } from "three";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);
const camTop = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);
camTop.position.set(0, 400, 0);
camera.name = "camera";
camera.add(camTop);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0fbd25, 1);
const container = document.createElement("div");
document.body.appendChild(container);
container.appendChild(renderer.domElement);
const loader = new THREE.TextureLoader();
new OrbitControls(camera, renderer.domElement);
let carVelocity = 0;
let carAcceleration = 0.05;
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);
let insetWidth = window.innerWidth / 4;
let insetHeight = window.innerHeight / 4;
let keymap = new Array(256);
document.addEventListener("keydown", function (event) {
  keymap[event.key] = true;
});
document.addEventListener("keyup", function (event) {
  keymap[event.key] = false;
});

let dir = new THREE.Vector3(0, 0, 1);
let camDir = new THREE.Vector3(0, 0, 1);

const track_retval = addTrack();
const track = track_retval[0];

const leftL = track_retval[1];
const rightL = track_retval[2];

const fLine1 = track_retval[3];
const fLine2 = track_retval[4];
const fLine3 = track_retval[5];




const car = createCar();
let car_health = 100;
let car_fuel = 100;
car.position.z += 75;
car.position.x += 50;
let secondCar_health = 100;
let check1 = 0;
let check2 = 0;
let cur_lap = 0;
var time = 0;
const secondCar = createCar();
// secondCar.position.x += 50;
// secondCar.position.z += 50;
const thirdCar = createCar();
thirdCar.position.x -= 50;
const fourthCar = createCar();
fourthCar.position.x -= 50;
fourthCar.position.z += 100;
container.appendChild(renderer.domElement);
var text2 = document.createElement("div");
text2.style.position = "absolute";
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text2.style.width = 500;
text2.style.height = 500;
text2.style.backgroundColor = "white";
text2.innerHTML =
  "Your Car Health: " +
  car_health +
  " Current Lap: " +
  cur_lap +
  " Car Velocity: " +
  Math.floor(-10 * carVelocity);
text2.style.fontSize = 40 + "px";
text2.style.color = "black";
text2.style.top = 50 + "px";
text2.style.left = 50 + "px";

var textFuel = document.createElement("div");
textFuel.style.position = "absolute";
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
textFuel.style.width = 500;
textFuel.style.height = 500;
textFuel.style.backgroundColor = "white";
textFuel.innerHTML = "Distance from next fuel can: ";
textFuel.style.fontSize = 40 + "px";
textFuel.style.color = "black";
textFuel.style.top = 100 + "px";
textFuel.style.left = 50 + "px";


var text3 = document.createElement("div");
text3.style.position = "absolute";
//text3.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text3.style.width = 5000;
text3.style.height = 5000;
text3.style.backgroundColor = "transparent";
text3.innerHTML = "Game Over: You Lose";
text3.style.fontSize = 60 + "px";
text3.style.top = 500 + "px";
text3.style.left = 500 + "px";

var text4 = document.createElement("div");
text4.style.position = "absolute";
//text4.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text4.style.width = 5000;
text4.style.height = 5000;
text4.style.backgroundColor = "transparent";
text4.innerHTML = "Game Over: You Win!!";
text4.style.fontSize = 60 + "px";
text4.style.top = 300 + "px";
text4.style.left = 50 + "px";



var textStart = document.createElement("div");
textStart.style.position = "absolute";
//text4.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
textStart.style.width = 5000;
textStart.style.height = 5000;
textStart.style.backgroundColor = "transparent";
textStart.innerHTML = "Press Space to Start";
textStart.style.fontSize = 60 + "px";
textStart.style.top = 300 + "px";
textStart.style.left = 500 + "px";
document.body.appendChild(textStart);
var textStart1 = document.createElement("div");
textStart1.style.position = "absolute";
//text4.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
textStart1.style.width = 5000;
textStart1.style.height = 5000;
textStart1.style.backgroundColor = "transparent";
textStart1.innerHTML = "Use W,A,S,D to move";
textStart1.style.fontSize = 40 + "px";
textStart1.style.top = 400 + "px";
textStart1.style.left = 500 + "px";
document.body.appendChild(textStart1);
container.appendChild(renderer.domElement);

let start = 0;
document.addEventListener("keydown", function (event) {
  if (event.key == " ") {
    start = 1;
    textStart.innerHTML = "";
    textStart1.innerHTML = "";
  }
});


scene.add(track);
scene.add(car);
scene.add(secondCar);
scene.add(thirdCar);
scene.add(fourthCar);
const tex = loader.load('https://i.imgur.com/hIWTqXp.jpeg');
const stadium = loader.load('Stadium.jpg');
const fG1 = new THREE.BoxGeometry( 10, 20, 10 );
const fM1 = new THREE.MeshPhongMaterial();
const finishLine = new THREE.BoxGeometry( 200, 10, 40 );
const finishLineMat = new THREE.MeshPhongMaterial();
const planeGeo = new THREE.PlaneGeometry( 6000, 3000 );
const planeMat = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide} );
planeMat.map = stadium;
const plane1 = new THREE.Mesh( planeGeo, planeMat );
const plane2 = new THREE.Mesh( planeGeo, planeMat );
const plane3 = new THREE.Mesh( planeGeo, planeMat );
const plane4 = new THREE.Mesh( planeGeo, planeMat );
plane1.rotation.y = Math.PI / 2;
plane1.position.x -= 600;
plane1.position.y += 1500;
scene.add( plane1 );

plane2.position.z -= 3000;
plane2.position.x += 150;
plane2.position.y += 1500;
scene.add(plane2);

plane3.position.y += 1500;
plane3.rotation.y = Math.PI/2;
plane3.position.x += 2500;
scene.add(plane3);

plane4.position.y += 1500;
plane4.position.z += 3000;
plane4.position.x += 150;
scene.add(plane4);
const fuelCans =[];
let fNo = getRandomInt(20);

const tex1 = loader.load('https://i.imgur.com/5pR9JNv.jpeg');
fM1.map = tex;
finishLineMat.map = tex1;
const finishLineMesh = new THREE.Mesh( finishLine, finishLineMat );
finishLineMesh.position.z += 100;
finishLineMesh.position.y -= 4;
scene.add(finishLineMesh);
while(fNo < 10){
  fNo = getRandomInt(20);
}
for(let i = 0; i < fNo; i++){
  let f1 = new THREE.Mesh( fG1, fM1 );
  let rX = getRandomInt(1400);
  let rL = getRandomInt(2);
  f1.position.y += 10;
  if(rL == 0){
    f1.position.z = fLine1[rX].z;
    f1.position.x = fLine1[rX].x;
  }
  else if(rL == 1){
    f1.position.z = fLine2[rX].z;
    f1.position.x = fLine2[rX].x;
  }
  else{
    f1.position.z = fLine3[rX].z;
    f1.position.x = fLine3[rX].x;
  }

  fuelCans.push(f1);
  scene.add(f1);
}
console.log(fuelCans);
let timer = new Clock();
const closestPointL = new THREE.Vector3(leftL[0].x, leftL[0].y, leftL[0].z);
const closestPointR = new THREE.Vector3(rightL[0].x, rightL[0].y, rightL[0].z);
let maxVel = -10;
secondCar.position.x = fLine1[0].x;
secondCar.position.z = fLine1[0].z;
thirdCar.position.x = fLine2[20].x;
thirdCar.position.z = fLine2[20].z;
fourthCar.position.x = fLine3[10].x;
fourthCar.position.z = fLine3[10].z;
let p1 = 0;
let p2 = 10;
let p3 = 10;
let friction = -0.003;
function moveCar() {
  if (keymap["w"]) {
    if (carVelocity > maxVel) {
      carVelocity -= carAcceleration;
    }
    if (carVelocity < maxVel) {
      carVelocity = maxVel;
    }
  }
  if (keymap["s"]) {
    if (carVelocity < 0) {
      carVelocity += carAcceleration * 2;
    } else {
      carVelocity += carAcceleration;
    }
  }
  if (keymap["d"]) {
    car.rotation.y -= Math.PI / 450;
    dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 450);
    camDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 450);
  }
  if (keymap["a"]) {
    car.rotation.y += Math.PI / 450;
    dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), +Math.PI / 450);
    camDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), +Math.PI / 450);
  }
  if (keymap[" "]) {
    carVelocity = 0;
  }
  for (let i = 0; i < leftL.length; i++) {
    if (
      car.position.distanceTo(leftL[i]) < car.position.distanceTo(closestPointL)
    ) {
      closestPointL.x = leftL[i].x;
      closestPointL.y = leftL[i].y;
      closestPointL.z = leftL[i].z;
    }
  }
  for (let i = 0; i < rightL.length; i++) {
    if (
      car.position.distanceTo(rightL[i]) <
      car.position.distanceTo(closestPointR)
    ) {
      closestPointR.x = rightL[i].x;
      closestPointR.y = rightL[i].y;
      closestPointR.z = rightL[i].z;
    }
  }
  if(carVelocity < 0)
  {
    carVelocity -= friction;
  }
  else if(carVelocity > 0)
  {
    carVelocity += friction;
  }
  else {
    carVelocity = 0;
  }
  car_fuel -= carVelocity*carVelocity*0.00025;
  car.position.addScaledVector(dir, carVelocity);
}
let check3 = 0;
let check4 = 0;


let total_time = 0;
let carVel1 = 2;
let carVel2 = 3;
let carVel3 = 4;
let ch1 = 0;
let ch2 = 0;
let ch3 = 0;
let fastest_time = 10000000000;
let thirdCam = 1;
let firstCam = 0;
const animate = function () {
  requestAnimationFrame(animate);
  if (start == 1) {
    camTop.lookAt(car.position);
    if(keymap["t"]) {
      thirdCam = 1;
      firstCam = 0;
    }
    if(keymap["y"]) {
      thirdCam = 0;
      firstCam = 1;
    }
    document.body.appendChild(text2);
    document.body.appendChild(textFuel);
    let time_elapsed = timer.getElapsedTime();
    const camLook = new THREE.Vector3(car.position.x,car.position.y+20,car.position.z);
    camLook.addScaledVector(dir, -30);
    camera.lookAt(camLook);
    
    ch1++;ch2++;ch3++
    if(ch1 == carVel1)
    {
      ch1 = 0;
      p1--;
    }
    if(ch2 == carVel2)
    {
      ch2 = 0;
      p2--;
    }
    if(ch3 == carVel3)
    {
      ch3 = 0;
      p3--;
    }
    if(p1 < 0){
      p1 = fLine1.length-1;
    }
    if(p2 < 0){
      p2 = fLine2.length-1;
    }
    if(p3 < 0){
      p3 = fLine3.length-1;
    }
    secondCar.position.x = fLine1[p1].x;
    secondCar.position.z = fLine1[p1].z;
    thirdCar.position.x = fLine2[p2].x;
    thirdCar.position.z = fLine2[p2].z;
    fourthCar.position.x = fLine3[p3].x;
    fourthCar.position.z = fLine3[p3].z;
    if (car.position.z < 0) {
      if (check2 == 0) {
        check2 = 1;
        cur_lap += 1;
        if(cur_lap != 1){
          timer.stop();
          time_elapsed = timer.getElapsedTime();
          total_time += time_elapsed;
          if(time_elapsed < fastest_time){
            fastest_time = time_elapsed;
          }
          timer.start();
        }
      }
    } else {
      check2 = 0;
    }
    for(let i = 0; i< fuelCans.length; i++)
    {
      if(car.position.distanceTo(fuelCans[i].position) < 20)
      {
        car_fuel += 20;
        fuelCans[i].position.y = -100000;
      }
      if(car_fuel > 100)
      {
        car_fuel = 100;
      }
    }
    if (car.position.distanceTo(secondCar.position) < 20) {
      if (check1 == 0) {
        check1 = 1;
        car_health -= 25;
        carVelocity = 0;
        car.position.z += 10;
        secondCar.position.z -= 40;
      }
    } else {
      check1 = 0;
    }
    if (car.position.distanceTo(thirdCar.position) < 20) {
      if (check3 == 0) {
        check3 = 1;
        car_health -= 25;
        carVelocity = 0;
        car.position.z += 10;
        thirdCar.position.z -= 40;
      }
    } else {
      check3 = 0;
    }
    if (car.position.distanceTo(fourthCar.position) < 20) {
      if (check4 == 0) {
        check4 = 1;
        car_health -= 25;
        carVelocity = 0;
        car.position.z += 10;
        fourthCar.position.z -= 40;
      }
    } else {
      check4 = 0;
    }
    if (car_health <= 0) {
      scene.clear();
      document.body.removeChild(text2);
      document.body.removeChild(textFuel);
      document.body.appendChild(text3);
      
    }
    if (car_fuel <= 0) {
      scene.clear();
      document.body.removeChild(text2);
      document.body.removeChild(textFuel);
      document.body.appendChild(text3);
      
    }
    if (cur_lap == 4) {
      scene.clear();
      document.body.removeChild(text2);
      document.body.removeChild(textFuel);
      document.body.appendChild(text4);
      timer.stop();
      time_elapsed = Math.floor(timer.getElapsedTime());
      text4.innerHTML = "Game Over: You Win!! " + 
      "Time Elapsed: " + Math.floor(total_time) + " seconds " + 
      "Fastest Lap: " + Math.floor(fastest_time) + " seconds";
      
    }
    let lCheck = 0;
    let rCheck = 0;
    const width = closestPointL.distanceTo(closestPointR);
    if (car.position.distanceTo(closestPointL) > width) {
      if (lCheck == 0) {
        lCheck = 1;
        carVelocity = -1;

        carAcceleration = 0.001;
        maxVel = -1;
      }
    } else {
      // lCheck = 0;
      if (car.position.distanceTo(closestPointR) > width) {
        if (rCheck == 0) {
          rCheck = 1;
          carVelocity = -1;
          carAcceleration = 0.001;
          maxVel = -1;
        }
      } else {
        carAcceleration = 0.05;
        maxVel = -10;
        rCheck = 0;
      }
    }
    let min = 100000000;
    for(let i = 0; i < fuelCans.length; i++){
      if(car.position.distanceTo(fuelCans[i].position) < min){
        min = car.position.distanceTo(fuelCans[i].position);
      }
    }
    textFuel.innerHTML =" Closest Fuel Can: " + Math.floor(min);
    moveCar();
    // for(let i = 0; i < leftL.length; i++) {
    //   text5.innerHTML += leftL[i] + " ";
    // }
    camera.position.copy(car.position);
    if(thirdCam){
      camera.position.z += 100 * camDir.z;
      camera.position.x += 100 * camDir.x;
      camera.position.y += 50;
    }
    else {
      camLook.addScaledVector(dir, -1000);
      camera.position.y += 25;
    }
    text2.innerHTML =
      "Your Car Health: " +
      car_health +
      " Current Lap: " +
      cur_lap +
      " Car Velocity: " +
      Math.floor(-10 * carVelocity) + 
      " Time Elapsed: " + Math.floor(time_elapsed) + 
      " Car Fuel: " + Math.floor(car_fuel);
    // 
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    renderer.clearDepth();
    renderer.setScissorTest(true);
    renderer.setScissor(
      window.innerWidth - insetWidth - 16,
      window.innerHeight - insetHeight - 16,
      insetWidth,
      insetHeight
    );
    renderer.setViewport(
      window.innerWidth - insetWidth - 16,
      window.innerHeight - insetHeight - 16,
      insetWidth,
      insetHeight
    );
    renderer.render(scene,camTop);
    renderer.setScissorTest(false);
  }
};

animate();
