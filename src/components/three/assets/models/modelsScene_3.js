import * as THREE from "three";

import materialsGlobal from "../materials/materialsGlobal";
import materialsScene_3 from "../materials/materialsScene_3";

import removeCameraObj from "./removeCameraObj";

//const BLOOM_OFF = 0;
const BLOOM_ON = 1;

const modelsScene_3 = (scene, zipLoad, assets_names, loader, cameraPoints) => {
  let materialsGeneral = materialsGlobal(zipLoad);

  loader.load(zipLoad.extractAsBlobUrl("contact.glb", ""), (gltf) => {
    let sceneGLTF = gltf.scene;
    let materials = materialsScene_3(zipLoad);

    gltf.scene.traverse((child) => {
      const { name } = child;

      if (child.isMesh) {
        if (name === "light_back") {
          child.layers.enable(BLOOM_ON);
        } else if (name === "light_front") {
          child.layers.enable(BLOOM_ON);
        } else if (name === "copyrights") {
          child.material = materialsGeneral.copyrightsMaterial;
          child.layers.mask = 3;
        } else if (name.startsWith("camera_")) {
          cameraPoints.push({
            position: {
              x: child.position.x,
              y: child.position.y,
              z: child.position.z,
            },
            name: child.name,
          });
        }

        if (!name.startsWith("camera_")) {
          //do not add cameras mesh to uuid array
          assets_names["scene3"].push(child.uuid);
        }
      } else if (child.type === "Group") {
        assets_names["scene3"].push(child.uuid);
        if (name === "car_box") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "window") {
              child.children[i].material = materials.windowCarMaterial;
            } else if (child.children[i].material.name === "black_metalic") {
              child.children[i].material = materials.carPaintMaterial;
            } else if (child.children[i].material.name === "steel") {
              child.children[i].material = materials.tyreSteel;
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "tires_back" || name === "tires_front") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "steel") {
              child.children[i].material = materials.tyreSteel;
            } else if (child.children[i].material.name === "tire") {
              child.children[i].material = materials.tyreRubberMaterial;
            }

            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "ground2") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "floor") {
              child.children[i].material = materials.roadMaterial;
            } else if (child.children[i].material.name === "white_light") {
              child.children[i].layers.mask = 3;
            }
            child.children[i].material.frustumCulled = false;
          }
        }
      }
    });

    //sort camera points
    cameraPoints.sort((a, b) => (a.name > b.name ? 1 : -1));

    scene.add(sceneGLTF);

    removeCameraObj(scene);

    addLigthtToScene3(scene, assets_names);
  });
};

const addLigthtToScene3 = (scene, assets_names) => {
  let pointLight = new THREE.PointLight(0x009bbc, 1.5, 0); //cyane
  pointLight.position.set(-100, 150, -100);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xab00bf, 1.5, 0); //violet
  pointLight.position.set(-100, 80, 100);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xab00bf, 0.8, 0); //violet2
  pointLight.position.set(10, 0, 55); //tył przód /góra dół /lewo prawo
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xa80000, 10, 30); //red back
  pointLight.position.set(30, 5, -1);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xffffff, 10, 30); //white left
  pointLight.position.set(-30, 1, -8);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xffffff, 10, 30); //white right
  pointLight.position.set(-30, 1, 5.5);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xffffff, 1, 40); //white global
  pointLight.position.set(0, 40, 0);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xa80000, 10, 30); //red back
  pointLight.position.set(30, 5, -8);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xa80000, 10, 30); //red back
  pointLight.position.set(30, 5, 5.5);
  scene.add(pointLight);
  assets_names["scene3"].push(pointLight.uuid);
};

export default modelsScene_3;
