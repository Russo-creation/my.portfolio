import * as THREE from "three";

import { getImgFromZipAsTexture, textureRepeat } from "../texturesImport.js";

const materialsGlobal = (zipLoad) => {
  //--------------
  //----general materials
  //--------------

  let material_cyberpunk_cyane = new THREE.MeshPhongMaterial({
    color: 0x009c9a,
    emissive: 0x009c9a,
    specular: 0xb9b9b9,
  });

  //steel

  let metalRustColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "metal_rust_Color.jpg",
    "image/jpg"
  );
  metalRustColorTexture = textureRepeat(metalRustColorTexture, 2, 2);

  let metalRustNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "rust_metal_normal.jpg",
    "image/jpg"
  );
  metalRustNormalTexture = textureRepeat(metalRustNormalTexture, 2, 2);

  let steel_material = new THREE.MeshStandardMaterial({
    map: metalRustColorTexture,
    normalMap: metalRustNormalTexture,
    metalness: 0.96,
    roughness: 0.4,
    normalScale: new THREE.Vector2(2.5, 2.5),
  });

  //--------------
  //----Concrete
  //--------------

  let concreteColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "concrete.jpg",
    "image/jpg"
  );
  concreteColorTexture = textureRepeat(concreteColorTexture, 8, 8);

  let concreteNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "concrete_normal.jpg",
    "image/jpg"
  );
  concreteNormalTexture = textureRepeat(concreteNormalTexture, 8, 8);

  let concrete_material = new THREE.MeshPhongMaterial({
    // color: 0x1a1a1a,
    map: concreteColorTexture,
    shininess: 50,
    specular: 0x222222,
    refractionRatio: 0.7,
    reflectivity: 0.8,
    normalMap: concreteNormalTexture,
    normalScale: new THREE.Vector2(1.6, 1.6),
  });

  let wallGrayConcrete = new THREE.MeshPhongMaterial({
    map: concreteColorTexture,
    shininess: 50,
    specular: 0x222222,
    refractionRatio: 0.7,
    reflectivity: 0.1,
    normalMap: concreteNormalTexture,
    normalScale: new THREE.Vector2(1.1, 1.1),
  });

  let wallYellowConcrete = new THREE.MeshPhongMaterial({
    color: 0x211700,
    shininess: 50,
    specular: 0x222222,
    refractionRatio: 0.7,
    reflectivity: 0.1,
    normalMap: concreteNormalTexture,
  });

  //mirror texts

  let mirrorTexture = getImgFromZipAsTexture(
    zipLoad,
    "mirror_text.png",
    "image/png"
  );

  //mirror texts around as image
  let mirrorText = new THREE.MeshPhongMaterial({
    map: mirrorTexture,
    color: 0x450000,
    emissive: 0x1a0003,
    specular: 0x5c5c5c,
    transparent: true,
    depthWrite: false,
  });

  //mirror texts choose profile / skills / certificate

  let mirrorProfile = new THREE.MeshPhongMaterial({
    map: mirrorTexture,
    color: 0x450000,
    emissive: 0x1a0003,
    specular: 0x5c5c5c,
    transparent: true,
    depthWrite: false,
    opacity: 0.15,
  });

  let mirrorSkills = new THREE.MeshPhongMaterial({
    map: mirrorTexture,
    color: 0x450000,
    emissive: 0x1a0003,
    specular: 0x5c5c5c,
    transparent: true,
    depthWrite: false,
    opacity: 0.15,
  });

  let mirrorCertificate = new THREE.MeshPhongMaterial({
    map: mirrorTexture,
    color: 0x450000,
    emissive: 0x1a0003,
    specular: 0x5c5c5c,
    transparent: true,
    depthWrite: false,
    opacity: 0.15,
  });

  let copyrightsMaterial = new THREE.MeshStandardMaterial({
    map: mirrorTexture,

    color: 0x450000,
    emissive: 0x1a0003,
    transparent: true,
    depthWrite: false,
  });

  return {
    material_cyberpunk_cyane: material_cyberpunk_cyane,

    steel_material: steel_material,
    concrete_material: concrete_material,
    wallGrayConcrete: wallGrayConcrete,
    wallYellowConcrete: wallYellowConcrete,
    mirrorProfile: mirrorProfile,
    mirrorSkills: mirrorSkills,
    mirrorCertificate: mirrorCertificate,
    mirrorText: mirrorText,
    copyrightsMaterial: copyrightsMaterial,
  };
};

export default materialsGlobal;
