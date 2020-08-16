import * as THREE from "three";

import { getImgFromZipAsTexture, textureRepeat } from "../texturesImport.js";
import { TranslucentShader } from "three/examples/jsm/shaders/TranslucentShader.js";

const materials_scene_2 = (zipLoad) => {
  //------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------Scene 2
  //------------------------------------------------------------------------------------

  //clothes

  let collarNormal_texture = getImgFromZipAsTexture(
    zipLoad,
    "collar_normal.jpg",
    "image/jpg"
  );
  collarNormal_texture = textureRepeat(collarNormal_texture, 2, 2);

  let collarMaterial = new THREE.MeshStandardMaterial({
    color: 0x090909,
    normalMap: collarNormal_texture,
    metalness: 0.05,
    roughness: 0.75,
    normalScale: new THREE.Vector2(6, 6),
  });

  let throusers_texture = getImgFromZipAsTexture(
    zipLoad,
    "trousers_Normal.png",
    "image/png"
  );

  let throusersMaterial = new THREE.MeshStandardMaterial({
    color: 0x101010,
    normalMap: throusers_texture,
    roughness: 0.65,
  });

  let shirt_texture = getImgFromZipAsTexture(
    zipLoad,
    "shirt_Normal.png",
    "image/png"
  );

  let shirt_material = new THREE.MeshStandardMaterial({
    color: 0x0e0e0e,
    normalMap: shirt_texture,
    roughness: 0.65,
  });

  let coat_texture = getImgFromZipAsTexture(
    zipLoad,
    "coat_Normal.png",
    "image/png"
  );

  let coat_material = new THREE.MeshStandardMaterial({
    color: 0x000000,
    normalMap: coat_texture,
    metalness: 0.0,
    roughness: 0.8,
    normalScale: new THREE.Vector2(1, 1),
  });

  let buttonsMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b1b1b,
    metalness: 0.6,
    roughness: 0.3,
  });

  //--------------
  //----thickness
  //--------------

  //thickness white

  let imgTexture = getImgFromZipAsTexture(zipLoad, "white.jpg", "image/jpg");

  //head thickness

  let thicknessHeadTexture = getImgFromZipAsTexture(
    zipLoad,
    "head_thickness.jpg",
    "image/jpg"
  );

  let shader = TranslucentShader;
  let uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  uniforms["map"].value = imgTexture;
  uniforms["diffuse"].value = new THREE.Vector3(0.0, 0.0, 0.0);
  uniforms["shininess"].value = 600;
  uniforms["thicknessMap"].value = thicknessHeadTexture;
  uniforms["thicknessColor"].value = new THREE.Vector3(1.0, 1.0, 1.0);
  uniforms["thicknessDistortion"].value = 0.1;
  uniforms["thicknessAmbient"].value = 0.4;
  uniforms["thicknessAttenuation"].value = 0.8;
  uniforms["thicknessPower"].value = 2.0;
  uniforms["thicknessScale"].value = 16.0;

  let head_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    lights: true,
  });
  head_material.extensions.derivatives = true;

  //hands thickness

  let thicknessHandsTexture = getImgFromZipAsTexture(
    zipLoad,
    "hand_thickness.jpg",
    "image/jpg"
  );

  let uniforms2 = THREE.UniformsUtils.clone(shader.uniforms);
  uniforms2["map"].value = imgTexture;
  uniforms2["diffuse"].value = new THREE.Vector3(0.0, 0.0, 0.0);
  uniforms2["shininess"].value = 600;
  uniforms2["thicknessMap"].value = thicknessHandsTexture;
  uniforms2["thicknessColor"].value = new THREE.Vector3(1.0, 1.0, 1.0);
  uniforms2["thicknessDistortion"].value = 0.1;
  uniforms2["thicknessAmbient"].value = 0.4;
  uniforms2["thicknessAttenuation"].value = 0.8;
  uniforms2["thicknessPower"].value = 2.0;
  uniforms2["thicknessScale"].value = 16.0;

  let hands_material = new THREE.ShaderMaterial({
    uniforms: uniforms2,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    lights: true,
  });
  hands_material.extensions.derivatives = true;

  //mirror mesh texts no image
  let mirrorMesh = new THREE.MeshPhongMaterial({
    color: 0x450000,
    emissive: 0x1a0003,
    specular: 0x5c5c5c,
  });

  //steel

  let steel = new THREE.MeshStandardMaterial({
    color: 0x626262,
    metalness: 0.92,
    roughness: 0.1,
  });

  return {
    collarMaterial: collarMaterial,
    throusersMaterial: throusersMaterial,
    shirt_material: shirt_material,
    coat_material: coat_material,
    buttonsMaterial: buttonsMaterial,
    head_material: head_material,
    hands_material: hands_material,

    mirrorMesh: mirrorMesh,

    steel: steel,
  };
};

export default materials_scene_2;
