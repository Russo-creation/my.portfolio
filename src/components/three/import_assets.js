import * as THREE from "three";

import modelsScene_1, {
  creatingSkyInScene,
} from "./assets/models/modelsScene_1";
import modelsScene_2 from "./assets/models/modelsScene_2";
import modelsScene_3 from "./assets/models/modelsScene_3";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const addCustomSceneObjects = (
  scene,
  zipLoad,
  carsGroup,
  trainGroup,
  assets_names,
  mixer,
  cameraPoints,
  mirrorSubjects
) => {
  //add light general ambient
  var light = new THREE.AmbientLight(0x9e9e9e); // soft white light
  scene.add(light);

  //define gltdloader for imports
  const loader = new GLTFLoader();

  //call all 3d models incule lights
  modelsScene_1(
    scene,
    zipLoad,
    carsGroup,
    trainGroup,
    assets_names,
    mixer,
    loader,
    cameraPoints
  );

  modelsScene_2(
    scene,
    zipLoad,
    assets_names,
    loader,
    cameraPoints,
    mirrorSubjects
  );

  modelsScene_3(scene, zipLoad, assets_names, loader, cameraPoints);

  //call sky creations for scene 1
  let sky = creatingSkyInScene(scene, zipLoad, assets_names);

  return {
    flash: sky.flash,
    rain: sky.rain,
    rainGeo: sky.rainGeo,
    cloudParticles: sky.cloudParticles,
  };
};

export default addCustomSceneObjects;
