import * as THREE from "three";

const createRain = (scene, assets_names) => {
  let rainGeo = new THREE.Geometry();
  const rainCount = 15000;
  for (let i = 0; i < rainCount; i++) {
    let rainDrop = new THREE.Vector3(
      Math.random() * 400 - 200,
      Math.random() * 500 - 250,
      Math.random() * 200 - 100
    );
    rainDrop.velocity = {};
    rainDrop.velocity = 0;
    rainGeo.vertices.push(rainDrop);
  }
  let rainMaterial = new THREE.PointsMaterial({
    // color: 0x535353,
    size: 0.1,
    transparent: true,
  });
  let rain = new THREE.Points(rainGeo, rainMaterial);

  rain.material.frustumCulled = false;
  assets_names["scene1"].push(rain.uuid);
  scene.add(rain);

  return { rain: rain, rainGeo: rainGeo };
};

export default createRain;
