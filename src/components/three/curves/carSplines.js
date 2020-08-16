import * as THREE from "three";

export const carViewBack = () => {
  let carSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(54.0795, 7.85338, 32.5733),
    new THREE.Vector3(62.9436, 9.74015, 14.8972),
    new THREE.Vector3(64.6452, 12.0694, -6.67926),
    new THREE.Vector3(58.8629, 14.089, -26.7566),
    new THREE.Vector3(48.9529, 15.7163, -40.2725),
  ]);

  carSpline.closed = false;
  return carSpline;
};

export const carViewFront = () => {
  let carSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-78.8003, 22.3764, -65.3867),
    new THREE.Vector3(-66.2401, 12.1269, -38.7304),
    new THREE.Vector3(-60.7704, 8.75685, -3.93063),
    new THREE.Vector3(-64.4886, 11.5134, 37.43),
    new THREE.Vector3(-80.2134, 20.647, 66.4475),
  ]);

  carSpline.closed = false;
  return carSpline;
};

export const carViewSide = () => {
  let carSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(126.871, 31.6252, 78.0315),
    new THREE.Vector3(77.7155, 22.148, 59.5948),
    new THREE.Vector3(47.1826, 17.5876, 52.8891),
    new THREE.Vector3(9.36823, 16.6158, 51.5716),

    new THREE.Vector3(-46.0281, 18.3314, 59.75),
    new THREE.Vector3(-110.63, 32.1027, 91.2533),
  ]);

  carSpline.closed = false;
  return carSpline;
};

export const carViewCircle = () => {
  let carSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-133.196, 8.80675, 11.1739),
    new THREE.Vector3(-106.629, 20.8406, -27.2712),
    new THREE.Vector3(-82.2109, 35.1355, -62.9224),
    new THREE.Vector3(-48.2216, 46.0849, -96.2546),
    new THREE.Vector3(-9.59648, 49.5651, -109.822),
    new THREE.Vector3(37.5669, 49.1488, -107.865),
    new THREE.Vector3(78.0231, 44.743, -96.6566),
    new THREE.Vector3(113.658, 38.7779, -76.6743),
    new THREE.Vector3(140.716, 33.5993, -46.9457),
  ]);

  carSpline.closed = false;
  return carSpline;
};
