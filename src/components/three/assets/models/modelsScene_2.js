import * as THREE from "three";

import materialsGlobal from "../materials/materialsGlobal";
import materialsScene_2 from "../materials/materialsScene_2";

import removeCameraObj from "./removeCameraObj";

import createMirror from "./createMirror";

//const BLOOM_OFF = 0;
const BLOOM_ON = 1;

const modelsScene_2 = (
  scene,
  zipLoad,
  assets_names,
  loader,
  cameraPoints,
  mirrorSubjects
) => {
  let materialsGeneral = materialsGlobal(zipLoad);

  loader.load(zipLoad.extractAsBlobUrl("head.glb", ""), (gltf) => {
    let materials = materialsScene_2(zipLoad);
    let sceneGLTF = gltf.scene;

    mirrorSubjects.push(materialsGeneral.mirrorProfile);
    mirrorSubjects.push(materialsGeneral.mirrorCertificate);
    mirrorSubjects.push(materialsGeneral.mirrorSkills);

    gltf.scene.traverse((child) => {
      const { name } = child;

      if (child.isMesh) {
        if (name === "blue_pt") {
          child.material = materialsGeneral.material_cyberpunk_cyane;
          child.material.frustumCulled = false;
        } else if (name === "coat") {
          child.material = materials.coat_material;
          child.material.frustumCulled = false;
          child.layers.enable(BLOOM_ON);
        } else if (name === "collar") {
          child.material = materials.collarMaterial;
          child.material.frustumCulled = false;
          child.layers.enable(BLOOM_ON);
        } else if (name === "shirt") {
          child.material = materials.shirt_material;
          child.material.frustumCulled = false;
          child.layers.enable(BLOOM_ON);
        } else if (name === "shirt_buttons") {
          child.material = materials.buttonsMaterial;
          child.material.frustumCulled = false;
        } else if (name === "throusers") {
          child.material = materials.throusersMaterial;
          child.material.frustumCulled = false;
          child.layers.enable(BLOOM_ON);
        } else if (name.startsWith("camera_")) {
          cameraPoints.push({
            position: {
              x: child.position.x,
              y: child.position.y,
              z: child.position.z,
            },
            name: child.name,
          });
        } else if (name === "mirror") {
          child.visible = false;

          scene.add(createMirror(child, assets_names));
        }

        if (!name.startsWith("camera_") && name !== "mirror") {
          //do not add cameras mesh to uuid array
          assets_names["scene2"].push(child.uuid);
        }
      } else if (child.type === "Group") {
        if (name === "steels") {
          assets_names["scene2"].push(child.uuid);
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "blue_light") {
              child.children[i].material =
                materialsGeneral.material_cyberpunk_cyane;
              child.children[i].layers.enable(BLOOM_ON);
            } else if (child.children[i].material.name === "steel") {
              child.children[i].material = materials.steel;
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "mirror_elements") {
          assets_names["scene2"].push(child.uuid);
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "mirror_text") {
              child.children[i].material = materialsGeneral.mirrorText;
              child.children[i].layers.enable(BLOOM_ON);
            } else if (child.children[i].material.name === "mirror_profil") {
              child.children[i].material = materialsGeneral.mirrorProfile;
              child.children[i].layers.enable(BLOOM_ON);
            } else if (
              child.children[i].material.name === "mirror_certificates"
            ) {
              child.children[i].material = materialsGeneral.mirrorCertificate;
              child.children[i].layers.enable(BLOOM_ON);
            } else if (child.children[i].material.name === "mirror_skills") {
              child.children[i].material = materialsGeneral.mirrorSkills;
              child.children[i].layers.enable(BLOOM_ON);
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "body") {
          assets_names["scene2"].push(child.uuid);
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "head") {
              child.children[i].material = materials.head_material;
            } else if (child.children[i].material.name === "hand") {
              child.children[i].material = materials.hands_material;
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "wall_roof") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "concrete") {
              child.children[i].material = materialsGeneral.wallGrayConcrete;
              assets_names["scene2"].push(child.uuid);
              child.children[i].layers.enable(BLOOM_ON);
            } else if (child.children[i].material.name === "concrete_yellow") {
              assets_names["scene2"].push(child.uuid);
              child.children[i].material = materialsGeneral.wallYellowConcrete;
            } else if (child.children[i].material.name === "metal") {
              assets_names["scene2"].push(child.uuid);
              child.children[i].material = materialsGeneral.steel_material;
            } else if (child.children[i].material.name === "blue_light") {
              assets_names["scene2"].push(child.uuid);
              child.children[i].material =
                materialsGeneral.material_cyberpunk_cyane;
              child.children[i].layers.enable(BLOOM_ON);
            } else if (child.children[i].material.name === "metal_new_gen") {
              assets_names["scene2"].push(child.uuid);
              child.children[i].material = materialsGeneral.steel_material;
              child.children[i].layers.enable(BLOOM_ON);
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "main_weapon") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "gun") {
              child.children[i].layers.enable(BLOOM_ON);
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

    addLigthtToScene2(scene, assets_names);
  });
};

const addLigthtToScene2 = (scene, assets_names) => {
  let pointLight = new THREE.PointLight(0x009bbc, 1, 0); //blue
  pointLight.power = 12.6;
  pointLight.decay = 2;
  pointLight.name = "s12Blue";
  pointLight.position.set(0, 200, 0);
  scene.add(pointLight);
  assets_names["scene2"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xab00bf, 1, 0); //violet
  pointLight.power = 15;
  pointLight.decay = 2;
  pointLight.name = "s12Violet";
  pointLight.position.set(100, 200, 100);
  scene.add(pointLight);
  assets_names["scene2"].push(pointLight.uuid);

  pointLight = new THREE.PointLight(0xa80000, 1, 0); //red
  pointLight.power = 20;
  pointLight.decay = 2;
  pointLight.name = "s12Red";
  pointLight.position.set(-100, -200, -100);
  scene.add(pointLight);
  assets_names["scene2"].push(pointLight.uuid);
};

export default modelsScene_2;
