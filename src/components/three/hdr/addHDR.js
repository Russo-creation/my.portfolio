import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import HdrFile from "../../../images/hdr/satara_night_1k_edt.hdr";

const addHDR = (scene, renderer) => {
  ///Load HDR map
  new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(HdrFile, (texture) => {
      var envMap = pmremGenerator.fromEquirectangular(texture).texture;

      //  scene.background = envMap;
      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });

  var pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
};

export default addHDR;
