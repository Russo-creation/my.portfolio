import * as THREE from "three";

export const getImgFromZipAsTexture = (zipLoad, fileName, type) => {
  //extracting image from zip and returning it as an texture
  let textureImg = zipLoad.extractAsBlobUrl(fileName, type);

  let texture = new THREE.Texture();
  texture.image = new Image();
  texture.image.onload = () => {
    texture.needsUpdate = true;
  };
  texture.image.src = textureImg;
  texture.flipY = false;
  return texture;
};

export const textureRepeat = (texture, xWrap, yWrap) => {
  // changing TextureTiliing (reapeating)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(xWrap, yWrap);
  return texture;
};
