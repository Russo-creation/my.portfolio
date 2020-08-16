import * as THREE from "three";

import { getImgFromZipAsTexture } from "../texturesImport";

//const BLOOM_OFF = 0;
const BLOOM_ON = 1;

const createClouds = (scene, zipLoad, assets_names) => {
  //creating clouds effect

  let cloudTexture = getImgFromZipAsTexture(
    zipLoad,
    "Smoke-Element.png",
    "image/png"
  );

  const cloudMaterial = new THREE.MeshLambertMaterial({
    color: 0x004851,
    map: cloudTexture,
    transparent: true,
    depthWrite: false,
  });
  const cloudGeo = new THREE.PlaneGeometry(300, 300);
  let cloudParticles = [];

  for (let p = 0; p < 80; p++) {
    var particle = new THREE.Mesh(cloudGeo, cloudMaterial);

    particle.layers.enable(BLOOM_ON);

    particle.position.set(
      Math.random() * 1000 - 550, //left right
      Math.random() * 100 + 600, // height
      Math.random() * 300 - 200
    );

    particle.rotation.z = Math.random() * 360;
    particle.rotation.x = Math.PI / 2;

    scene.add(particle);
    cloudParticles.push(particle);

    assets_names["scene1"].push(particle.uuid);
  }

  return cloudParticles;
};

export default createClouds;
