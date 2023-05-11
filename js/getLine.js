import * as THREE from "three";

export default function getLine() {
  const trackVertex = [
    0, 0, 0, 0, 0, 500, 0, 0, 1000, 500, 0, 2000, 1500, 0, 2000, 2000, 0, 1000,
    2000, 0, 500, 2000, 0, 0, 2000, 0, -500, 2000, 0, -1000, 1500, 0, -2000,
    500, 0, -2000, 0, 0, -1000, 0, 0, -500, 0, 0, 0,
  ];

  const trackSegments = [];

  for (let i = 0; i < trackVertex.length; i += 3) {
    trackSegments.push(
      new THREE.Vector3(trackVertex[i], trackVertex[i + 1], trackVertex[i + 2])
    );
  }

  const length = 1400;
  const width = 50;

  const trackCurve = new THREE.CatmullRomCurve3(trackSegments);
  const points = trackCurve.getPoints(length);
  const len = trackCurve.getLength();
  const lenList = trackCurve.getLengths(length);

  const faceNumber = length * width * 2;
  const verticeNumber = (length + 1) * (width + 1);

  const trackUvs = new Float32Array(verticeNumber * 2);
  const trackVertices = new Float32Array(verticeNumber * 3);
  const trackIndices = new Uint32Array(faceNumber * 3);

  const g = new THREE.BufferGeometry();
  g.setIndex(new THREE.BufferAttribute(trackIndices, 1));
  g.setAttribute("position", new THREE.BufferAttribute(trackVertices, 3));

  let index = 0;
  let a, b, c, d;

  for (let j = 0; j < length; j++) {
    for (let i = 0; i < width; i++) {
      a = (width + 1) * j + i;
      b = (width + 1) * (j + 1) + i;
      c = (width + 1) * (j + 1) + 1 + i;
      d = (width + 1) * j + 1 + i;

      trackIndices[index] = a;
      trackIndices[index + 1] = b;
      trackIndices[index + 2] = c;

      trackIndices[index + 3] = a;
      trackIndices[index + 4] = c;
      trackIndices[index + 5] = d;

      g.addGroup(index, 6, i);

      index += 6;
    }
  }
  const normals = [];

  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3(0, 1, 0);
  let tangent;

  let x, y, z;
  let position_index = 0;

  for (let i = 0; i <= length; i++) {
    tangent = trackCurve.getTangent(i / length);
    normal.crossVectors(tangent, binormal);
    normal.normalize();
    normals.push(normal.clone());

    binormal.crossVectors(normal, tangent); // new binormal
  }
  const distance = [-1, -0.85, -0.01, 0.01, 0.85, 1]; // width from the center line

  for (let j = 0; j <= length; j++) {
    for (let i = 0; i <= width; i++) {
      x = points[j].x + distance[i] * 100 * normals[j].x;
      y = points[j].y;
      z = points[j].z + distance[i] * 100 * normals[j].z;

      trackVertices[position_index] = x;
      trackVertices[position_index + 1] = y;
      trackVertices[position_index + 2] = z;

      position_index += 3;
    }
  }
  const leftLine = [];
  for (let j = 3; j <= length; j += 18) {
    leftLine.push(
      new THREE.Vector3(
        trackVertices[j],
        trackVertices[j + 1],
        trackVertices[j + 2]
      )
    );
  }
  const rightLine = [];
  for (let j = 3; j <= length; j += 18) {
    rightLine.push(
      new THREE.Vector3(
        trackVertices[j],
        trackVertices[j + 1],
        trackVertices[j + 2]
      )
    );
  }
  return leftLine;
}
