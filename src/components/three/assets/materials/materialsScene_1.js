import * as THREE from "three";

import { getImgFromZipAsTexture, textureRepeat } from "../texturesImport.js";

const materials_scene_1 = (zipLoad) => {
  //------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------Scene 1
  //------------------------------------------------------------------------------------

  //--------------
  //----Brick
  //--------------

  let brickColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "bricks_color.jpg",
    "image/jpg"
  );
  brickColorTexture = textureRepeat(brickColorTexture, 6, 6);

  let brickNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "bricks_normal.jpg",
    "image/jpg"
  );
  brickNormalTexture = textureRepeat(brickNormalTexture, 6, 6);

  let brick_material = new THREE.MeshPhongMaterial({
    // color: 0x100000,
    map: brickColorTexture,
    shininess: 10,
    specular: 0x222222,
    normalMap: brickNormalTexture,
    normalScale: new THREE.Vector2(2.8, 2.8),
  });

  //--------------
  //----New gen metal
  //--------------
  let metalNewGenColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "metal_rust_repolished_color.jpg",
    "image/jpg"
  );
  metalNewGenColorTexture = textureRepeat(metalNewGenColorTexture, 6, 6);

  let metalNewGenNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "metal_rust_repolished_normal.jpg",
    "image/jpg"
  );
  metalNewGenNormalTexture = textureRepeat(metalNewGenNormalTexture, 6, 6);

  let metalNewGen_material = new THREE.MeshPhongMaterial({
    color: 0x0f0f0f,
    map: metalNewGenColorTexture,
    shininess: 160,
    specular: 0x424242,
    refractionRatio: 1,
    reflectivity: 1,
    normalMap: metalNewGenNormalTexture,
    normalScale: new THREE.Vector2(2.8, 2.8),
  });

  let train_sides = new THREE.MeshPhongMaterial({
    color: 0x3f2500,
    map: metalNewGenColorTexture,
    shininess: 160,
    specular: 0x424242,
    refractionRatio: 1,
    reflectivity: 1,
    normalMap: metalNewGenNormalTexture,
    normalScale: new THREE.Vector2(2.4, 2.4),
  });

  let flyingCarSides = new THREE.MeshPhongMaterial({
    color: 0x3f2500,
    map: metalNewGenColorTexture,
    shininess: 160,
    specular: 0x424242,
    refractionRatio: 1,
    reflectivity: 1,
    normalMap: metalNewGenNormalTexture,
    normalScale: new THREE.Vector2(2.4, 2.4),
  });

  //--------------
  //----Metal plates
  //--------------
  let metalPlatesNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "MetalPlates_normal.jpg",
    "image/jpg"
  );
  metalPlatesNormalTexture = textureRepeat(metalPlatesNormalTexture, 6, 6);

  let metalPlatesColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "MetalPlates_color.jpg",
    "image/jpg"
  );
  metalPlatesColorTexture = textureRepeat(metalPlatesColorTexture, 6, 6);
  let metalPlates_material = new THREE.MeshPhongMaterial({
    color: 0x070707,
    map: metalPlatesColorTexture,
    shininess: 160,
    specular: 0x424242,
    refractionRatio: 1,
    reflectivity: 1,
    normalMap: metalPlatesNormalTexture,
    normalScale: new THREE.Vector2(2.8, 2.8),
  });

  //--------------
  //----CardBoard
  //--------------
  let cardboardTexture = getImgFromZipAsTexture(
    zipLoad,
    "cardbox.png",
    "image/png"
  );
  let cardboard_material = new THREE.MeshStandardMaterial({
    // color: 0x0f0f0f,
    map: cardboardTexture,
    metalness: 0.92,
    roughness: 0.1,
  });

  //--------------
  //----corrugated steel
  //--------------

  let corrugatedSteelColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "corrugated_steel_color.jpg",
    "image/jpg"
  );

  corrugatedSteelColorTexture = textureRepeat(
    corrugatedSteelColorTexture,
    2,
    2
  );

  let corrugatedSteelNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "corrugated_steel_normal.jpg",
    "image/jpg"
  );
  corrugatedSteelNormalTexture = textureRepeat(
    corrugatedSteelNormalTexture,
    2,
    2
  );

  let corrugatedSteel_material = new THREE.MeshStandardMaterial({
    map: corrugatedSteelColorTexture,
    normalMap: corrugatedSteelNormalTexture,
    metalness: 0.88,
    roughness: 0.1,
    normalScale: new THREE.Vector2(1, 1),
  });

  //--------------
  //----floor concrete
  //--------------

  let floorTilesColorTexture = getImgFromZipAsTexture(
    zipLoad,
    "floor_tiles_color.jpg",
    "image/jpg"
  );
  floorTilesColorTexture = textureRepeat(floorTilesColorTexture, 8, 8);

  let floorTilesNormalTexture = getImgFromZipAsTexture(
    zipLoad,
    "floor_tiles_normal.jpg",
    "image/jpg"
  );
  floorTilesNormalTexture = textureRepeat(floorTilesNormalTexture, 8, 8);

  let floorTiles_material = new THREE.MeshStandardMaterial({
    map: floorTilesColorTexture,
    normalMap: floorTilesNormalTexture,
    metalness: 0.92,
    roughness: 0.1,
    normalScale: new THREE.Vector2(1.5, 1.5),
  });

  let floorTilesDark_material = new THREE.MeshStandardMaterial({
    map: floorTilesColorTexture,
    normalMap: floorTilesNormalTexture,
    metalness: 0.94,
    roughness: 0.05,
    normalScale: new THREE.Vector2(1.5, 1.5),
  });

  //--------------
  //----texts Materials
  //--------------

  let textsTexture = getImgFromZipAsTexture(zipLoad, "texts.png", "image/png");

  //building text recrute red

  let material_recrute = new THREE.MeshLambertMaterial({
    color: 0x770027,
    emissive: 0x7c0028,
    map: textsTexture,
    transparent: true,
    depthWrite: false,
    opacity: 1.5,
  });

  // bar text blue opportunity

  let material_opportunity = new THREE.MeshLambertMaterial({
    color: 0x006d6c,
    map: textsTexture,
    transparent: true,
    depthWrite: false,
  });

  // bulding blue text code

  let material_code = new THREE.MeshLambertMaterial({
    color: 0x006d6c,
    emissive: 0x006d6c,
    map: textsTexture,
    transparent: true,
    depthWrite: false,
  });

  //bar text red

  let material_bar = new THREE.MeshLambertMaterial({
    color: 0x770027,
    emissive: 0x55001c,
    map: textsTexture,
    transparent: true,
    depthWrite: false,
  });

  //hammer it poster

  let material_hammer_it_off = new THREE.MeshLambertMaterial({
    color: 0x7c0028,
    emissive: 0x7c0028,
    map: textsTexture,
    transparent: true,
    depthWrite: false,
    opacity: 1.4,
  });

  let material_hammer_girl = new THREE.MeshLambertMaterial({
    color: 0x280037,
    emissive: 0x280037,
    map: textsTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0.32,
  });

  //--------------
  //----blinds
  //--------------

  let blinds_material = new THREE.MeshStandardMaterial({
    color: 0x2f2f2f,
    metalness: 0.9,
    roughness: 0.2,
  });

  //steel

  let material_steel = new THREE.MeshStandardMaterial({
    color: 0x141414,
    roughness: 0.2,
    metalness: 0.8,
  });

  //emmisive logo layer
  let material_cyberpunk_white = new THREE.MeshPhongMaterial({
    color: 0x606060,
    emissive: 0x606060,
    specular: 0xb9b9b9,
  });

  //emmisive logo layer
  let material_cyberpunk_red = new THREE.MeshPhongMaterial({
    color: 0x770027,
    emissive: 0x7c0028,
    specular: 0xb9b9b9,
  });

  // vehicles lights
  let material_flames = new THREE.MeshPhongMaterial({
    color: 0x0024ff,
    emissive: 0x0024ff,
  });

  //  opportunity emmisive text
  let cyane_lights = new THREE.MeshPhongMaterial({
    color: 0x003b51,
    emissive: 0x003b51,
    specular: 0xb9b9b9,
  });

  return {
    metalNewGen_material: metalNewGen_material,
    train_sides: train_sides,
    flyingCarSides: flyingCarSides,
    brick_material: brick_material,
    metalPlates_material: metalPlates_material,
    cardboard_material: cardboard_material,
    corrugatedSteel_material: corrugatedSteel_material,
    floorTiles_material: floorTiles_material,
    floorTilesDark_material: floorTilesDark_material,
    material_recrute: material_recrute,
    material_opportunity: material_opportunity,
    material_code: material_code,
    material_bar: material_bar,
    material_hammer_it_off: material_hammer_it_off,
    material_hammer_girl: material_hammer_girl,
    blinds_material: blinds_material,
    material_steel: material_steel,
    material_cyberpunk_white: material_cyberpunk_white,
    material_cyberpunk_red: material_cyberpunk_red,
    material_flames: material_flames,
    cyane_lights: cyane_lights,
  };
};

export default materials_scene_1;
