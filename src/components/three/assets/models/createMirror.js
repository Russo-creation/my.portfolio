import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

const BLOOM_ON = 1;

const createMirror = (child, assets_names) => {
  const heightMirror =
    Math.abs(child.geometry.boundingBox.max.y) +
    Math.abs(child.geometry.boundingBox.min.y);
  const widthMirror = Math.abs(
    Math.abs(child.geometry.boundingBox.max.z) +
      Math.abs(child.geometry.boundingBox.min.z)
  );

  var geometry = new THREE.PlaneBufferGeometry(widthMirror, heightMirror);

  var verticalMirror = new Reflector(geometry, {
    textureWidth: 1500,
    textureHeight: 1500,
    color: 0x707070,
  });

  verticalMirror.name = "mirrorReflection";

  assets_names["scene2"].push(verticalMirror.uuid);

  verticalMirror.rotation.y = Math.PI * -0.5;

  verticalMirror.position.x = child.geometry.boundingBox.min.x;
  verticalMirror.position.y =
    heightMirror / 2 + child.geometry.boundingBox.min.y;

  verticalMirror.position.z =
    widthMirror / 2 + child.geometry.boundingBox.min.z;

  verticalMirror.layers.enable(BLOOM_ON);
  verticalMirror.renderOrder = Infinity; // FIX

  return verticalMirror;
};

export default createMirror;
