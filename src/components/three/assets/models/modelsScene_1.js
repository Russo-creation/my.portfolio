import * as THREE from "three";

import materialsGlobal from "../materials/materialsGlobal";
import materialsScene_1 from "../materials/materialsScene_1";

import removeCameraObj from "./removeCameraObj";

import createClouds from "../scene_1/createClouds";
import createStormLight from "../scene_1/createStormLight";
import createRain from "../scene_1/createRain";

//const BLOOM_OFF = 0;
//const BLOOM_ON = 1;

const modelsScene_1 = (
  scene,
  zipLoad,
  carsGroup,
  trainGroup,
  assets_names,
  mixer,
  loader,
  cameraPoints
) => {
  let carsLightTempGroup = [];
  let materialsGeneral = materialsGlobal(zipLoad);

  loader.load(zipLoad.extractAsBlobUrl("city.glb", ""), (gltf) => {
    let sceneGLTF = gltf.scene;
    let materials = materialsScene_1(zipLoad);

    let helperMixer = new THREE.AnimationMixer(sceneGLTF);

    let action1 = helperMixer.clipAction(gltf.animations[0]);
    action1.play();
    let action2 = helperMixer.clipAction(gltf.animations[1]);
    action2.play();

    mixer.push(helperMixer);

    gltf.scene.traverse((child) => {
      const { name } = child;

      if (child.isMesh) {
        if (name === "recrute_text") {
          child.material = materials.material_recrute;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "code_text") {
          child.material = materials.material_code;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "logo_layer_1") {
          child.material = materials.material_cyberpunk_red;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "logo_layer_2") {
          child.material = materials.material_cyberpunk_white;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "cyane_lights") {
          child.material = materials.cyane_lights;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "pole") {
          child.material = materialsGeneral.concrete_material;
          child.material.frustumCulled = false;
        } else if (name === "rail") {
          child.material = materials.material_steel;
          child.material.frustumCulled = false;
        } else if (name === "bar_text") {
          child.material = materials.material_bar;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "opportunity_text") {
          child.material = materials.material_opportunity;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "hammer_text") {
          child.material = materials.material_hammer_it_off;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "hammer_girl") {
          child.material = materials.material_hammer_girl;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "cardboards") {
          child.material = materials.cardboard_material;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "blinds") {
          child.material = materials.blinds_material;
          child.material.frustumCulled = false;
        } else if (name === "curb") {
          child.material = materials.floorTilesDark_material;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "street") {
          child.material = materials.floorTiles_material;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name.startsWith("fan_")) {
          child.material = materialsGeneral.steel_material;
          child.material.frustumCulled = false;
        } else if (name === "metal_constructions") {
          child.material = materialsGeneral.steel_material;
          child.material.frustumCulled = false;
          child.layers.mask = 3;
        } else if (name === "building_4") {
          child.material = materials.metalPlates_material;
          child.material.frustumCulled = false;
        } else if (name === "corrugated_steel") {
          child.material = materials.corrugatedSteel_material;
          child.material.frustumCulled = false;
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
          assets_names["scene1"].push(child.uuid);
        }
      } else if (child.type === "Group") {
        assets_names["scene1"].push(child.uuid);
        if (name === "building_1") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "material_conctete") {
              child.children[i].material = materialsGeneral.concrete_material;
            } else if (child.children[i].material.name === "material_metal") {
              child.children[i].material = materials.metalNewGen_material;
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name === "building_3") {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "metal_wall") {
              child.children[i].material = materials.metalPlates_material;
              child.children[i].layers.mask = 3;
            } else if (child.children[i].material.name === "brick") {
              child.children[i].material = materials.brick_material;
              child.children[i].layers.mask = 3;
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name.startsWith("train")) {
          trainGroup.push({
            obj: child,
            x: child.position.x,
          });
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "train_bottom") {
              child.children[i].material = materials.metalNewGen_material;
            } else if (child.children[i].material.name === "train_top") {
              child.children[i].material = materials.train_sides;
            } else if (child.children[i].material.name === "train_flames") {
              child.children[i].material = materials.material_flames;
              child.children[i].layers.mask = 3;
            } else if (child.children[i].material.name === "train_lights") {
              child.children[i].material =
                materialsGeneral.material_cyberpunk_cyane;
              child.children[i].layers.mask = 3;
            }
            child.children[i].material.frustumCulled = false;
          }
        } else if (name.startsWith("car")) {
          carsGroup.push({
            car_obj: child,
            car_poz: { ...child.position },
            light_obj: null,
            light_poz: null,
            finished: true,
          });
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].material.name === "car_bottom") {
              child.children[i].material = materials.metalNewGen_material;
            } else if (child.children[i].material.name === "car_top") {
              child.children[i].material = materials.flyingCarSides;
            } else if (child.children[i].material.name === "car_flames") {
              child.children[i].material = materials.material_flames;
              child.children[i].layers.mask = 3;
            } else if (child.children[i].material.name === "train_lights") {
              child.children[i].material =
                materialsGeneral.material_cyberpunk_cyane;
              child.children[i].layers.mask = 3;
            }
            child.children[i].material.frustumCulled = false;
          }
        }
      } else if (child.type === "PointLight") {
        assets_names["scene1"].push(child.uuid);
        if (name.startsWith("train_light_")) {
          child.power = 300;
          child.decay = 2;
          child.distance = 100;
          child.color.setHex(0x002df1);

          trainGroup.push({
            obj: child,
            x: child.position.x,
          });
        } else if (name.startsWith("car_light_")) {
          child.power = 300;
          child.decay = 2;
          child.distance = 200;
          child.color.setHex(0x002df1);

          carsLightTempGroup.push({
            obj: child,
            carName: "car00" + name.charAt(10),
            position: { ...child.position },
          });
        } else if (name.startsWith("hammer_lamp")) {
          child.power = 100;
          child.decay = 2;
          child.distance = 100;
          child.color.setHex(0x780079);
        }
      }
    });
    //sort camera points
    cameraPoints.sort((a, b) => (a.name > b.name ? 1 : -1));

    //adding to carsGroup array lights from temporary light arrray
    carsGroup.map((car) => {
      const lighter = carsLightTempGroup.filter(
        (light) => car.car_obj.name === light.carName
      );

      car.light_obj = lighter[0].obj;
      car.light_poz = lighter[0].position;
      return null;
    });

    addLigthtToScene1(scene);

    scene.add(sceneGLTF);

    removeCameraObj(scene);
  });
};

const addLigthtToScene1 = (scene) => {
  //no light additional yet
};

export const creatingSkyInScene = (scene, zipLoad, assets_names) => {
  //adding light (for storm effect)

  let flash = createStormLight(scene, assets_names);

  //creating rain effect

  let setRain = createRain(scene, assets_names);

  //creating clouds effect
  let cloudParticles = createClouds(scene, zipLoad, assets_names);

  return {
    flash: flash,
    rain: setRain.rain,
    rainGeo: setRain.rainGeo,
    cloudParticles: cloudParticles,
  };
};

export default modelsScene_1;
