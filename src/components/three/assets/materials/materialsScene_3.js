import * as THREE from "three";

import { getImgFromZipAsTexture, textureRepeat } from "../texturesImport.js";

const materials_scene_3 = (zipLoad) => {
  //------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------Scene 3
  //------------------------------------------------------------------------------------

  //--------------
  //----Road
  //--------------

  let roadRoughnessTexture = getImgFromZipAsTexture(
    zipLoad,
    "road_roughness.jpg",
    "image/jpg"
  );
  roadRoughnessTexture = textureRepeat(roadRoughnessTexture, 5, 5);

  let roadMaterial = new THREE.MeshStandardMaterial({
    color: 0x060606,
    metalness: 0.1,
    roughnessMap: roadRoughnessTexture,
  });

  //--------------
  //----car paint
  //--------------

  let carPaintColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "car_paint_color.jpg",
    "image/jpg"
  );
  carPaintColorTexture = textureRepeat(carPaintColorTexture, 20, 20);

  let carPaintNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "car_paint_normal.jpg",
    "image/jpg"
  );
  carPaintNormalTexture = textureRepeat(carPaintNormalTexture, 20, 20);

  let carPaintMaterial = new THREE.MeshStandardMaterial({
    color: 0x3b3b3b,
    map: carPaintColorTexture,
    normalMap: carPaintNormalTexture,
    metalness: 0.87,
    roughness: 0.3,
  });

  //car window

  let windowCarMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1c1c,
    metalness: 0.92,
    roughness: 0.1,
  });

  //tyre rubber

  let carTyreTexture = getImgFromZipAsTexture(zipLoad, "tyre.jpg", "image/jpg");

  let tyreRubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    normalMap: carTyreTexture,
    metalness: 0.0,
    roughness: 1.0,
  });

  //tyre steel

  let tyreSteel = new THREE.MeshStandardMaterial({
    color: 0x858585,
    metalness: 0.75,
    roughness: 0.1,
  });

  return {
    roadMaterial: roadMaterial,
    carPaintMaterial: carPaintMaterial,
    windowCarMaterial: windowCarMaterial,
    tyreSteel: tyreSteel,
    tyreRubberMaterial: tyreRubberMaterial,
  };
};

export default materials_scene_3;
