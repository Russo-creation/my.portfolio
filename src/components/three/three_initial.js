import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import "../../scss//three/three.scss";

import * as THREE from "three";
import ZipLoader from "zip-loader";
import zipfile from "../../models/3d_assets.zip";

import addCustomSceneObjects from "./import_assets.js";
import humanStandCurve from "./curves/humanStand";

import createMirror from "./assets/models/createMirror";

import {
  carViewSide,
  carViewBack,
  carViewFront,
  carViewCircle,
} from "./curves/carSplines";

import addHDR from "./hdr/addHDR";
import animationSky from "./animation/sky";
import trainAnimation from "./animation/train";
import carAnimation from "./animation/car";
import { cameraMoveHuman } from "./animation/cameraMove/cameraMoveHuman";
import { cameraMoveCurveScene1 } from "./animation/cameraMove/scene1BezierMove";
import { cameraMoveCurveScene2 } from "./animation/cameraMove/scene2BezierMove";
import {
  cameraMoveCarTimerLap,
  cameraMoveCarExposition,
  fadeCarView,
} from "./animation/cameraMove/scene3CarMove";

import {
  cameraAnimateLookAt,
  getExactPointLookAt,
} from "./animation/cameraLookAt";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";

class Three_initial extends Component {
  constructor(props) {
    super(props);

    this.cameraOrientation = null;

    this.cameraPoints = [];
    this.cameraMoveVector = { x: 0, y: 400, z: 20, scal: 0.032 };
    this.changePozCamera = false;
    this.changePozCamera2 = false;

    this.previousScene = 0;
    this.fadeOutScene = false;
    this.fadeInScene = false;

    this.assets_names = { scene1: [], scene2: [], scene3: [] };
    this.carsGroup = [];
    this.trainGroup = [];
    this.trainFinished = false; // or true

    this.flash = null;

    this.cloudParticles = null;

    this.rainGeo = null;
    this.rain = null;
    this.mixer = [];

    this.bezierTime = 0.001;
    this.bezierTime2 = 0.001;
    this.carViewTime = { time: 0, lap: 0 };

    this.mirrorSubjects = [];

    this.LimiterDt = 1000 / 75;
    this.timeTarget = 0;
  }

  componentDidMount() {
    this.props.onQalityDetect();
    this.mount.style.opacity = 1;
    this.sceneSetup();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
  }

  sceneSetup = () => {
    this.clock = new THREE.Clock();
    //initialize
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0015); //setting the mist on screen (color, distance)
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000); //camera 1scene
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: false,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref

    addHDR(this.scene, this.renderer);
    this.addPostProcessingEffects(width, height);

    ZipLoader.install({ THREE: THREE });

    let zipLoad = new ZipLoader(zipfile);
    zipLoad.on("progress", (event) => {
      this.props.onLoadingProgress((event.loaded / event.total) * 100);
    });

    zipLoad.on("load", (event) => {
      const scenesAttributes = addCustomSceneObjects(
        this.scene,
        zipLoad,
        this.carsGroup,
        this.trainGroup,
        this.assets_names,
        this.mixer,
        this.cameraPoints,
        this.mirrorSubjects
      );

      this.cloudParticles = scenesAttributes.cloudParticles;
      this.flash = scenesAttributes.flash;
      this.rain = scenesAttributes.rain;
      this.rainGeo = scenesAttributes.rainGeo;
    });
    zipLoad.load();

    this.definingCurves(); // geting curves shapes and assign to variables
  };

  definingCurves = () => {
    this.tubeGeometry = new THREE.TubeBufferGeometry(
      humanStandCurve(),
      100,
      1,
      1,
      true
    );

    this.curveCarSideView = new THREE.TubeBufferGeometry(
      carViewSide(),
      1,
      1,
      1,
      true
    );

    this.curveCarBackView = new THREE.TubeBufferGeometry(
      carViewBack(),
      1,
      1,
      1,
      true
    );

    this.curveCarFrontView = new THREE.TubeBufferGeometry(
      carViewFront(),
      1,
      1,
      1,
      true
    );

    this.curveCarCircleView = new THREE.TubeBufferGeometry(
      carViewCircle(),
      1,
      1,
      1,
      true
    );
  };

  addPostProcessingEffects = (width, height) => {
    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////Render Exposture
    /////////////////////////////////////////////////////////////////////////////

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0;

    //this.renderer.outputEncoding = THREE.sRGBEncoding;

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////Selective Unreal Bloom
    //////////////////////////////////////////////////////////////////////////////

    this.darkMaterial = new THREE.MeshBasicMaterial({ color: "black" }); //define material ignores bloom
    this.materials = {}; //array of materaials bloom /leave empty

    //define if obj bloom or not
    this.BLOOM_OFF = 0;
    this.BLOOM_ON = 1;
    //setting layers for bloom
    this.bloomLayer = new THREE.Layers();
    this.bloomLayer.set(this.BLOOM_ON);

    //leave the variables (none effect)
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(400, 400), 1, 1, 1);

    //edit variables to change effect

    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 6;
    this.bloomPass.radius = 0.9;

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer1 = new EffectComposer(this.renderer);
    this.composer1.renderToScreen = false; // dont render this composer
    this.composer1.addPass(this.renderPass);
    this.composer1.addPass(this.bloomPass);

    this.finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.composer1.renderTarget2.texture },
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        defines: {},
      }),
      "baseTexture"
    );
    this.finalPass.needsSwap = true;

    this.finalComposer = new EffectComposer(this.renderer);
    this.finalComposer.addPass(this.renderPass);
    this.finalComposer.addPass(this.finalPass);

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////Anty-Aliasing- FXAA
    //////////////////////////////////////////////////////////////////////////////

    this.fxaaPass = new ShaderPass(FXAAShader);
    var pixelRatio = this.renderer.getPixelRatio();

    this.fxaaPass.material.uniforms["resolution"].value.x =
      1 / (width * pixelRatio);
    this.fxaaPass.material.uniforms["resolution"].value.y =
      1 / (height * pixelRatio);

    //this.finalComposer.addPass(this.fxaaPass);

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////Depth Of field- Bokeh
    //////////////////////////////////////////////////////////////////////////////

    //leave the variables (none effect)
    this.bokehPass = new BokehPass(this.scene, this.camera, {
      focus: 1,
      aperture: 1,
      maxblur: 1,

      width: 400,
      height: 400,
    });

    this.composer3 = new EffectComposer(this.renderer);
    this.composer3.addPass(this.renderPass);
    this.composer3.addPass(this.finalPass);
    this.composer3.addPass(this.fxaaPass);
    this.composer3.addPass(this.bokehPass);
    this.renderer.autoClear = false;

    //change values to set effect
    this.postprocessing = {};
    this.postprocessing.composer = this.composer3;
    this.postprocessing.bokeh = this.bokehPass;

    //temporary 1 scene
    this.postprocessing.bokeh.uniforms["focus"].value = 350.0;
    this.postprocessing.bokeh.uniforms["aperture"].value = 2 * 0.00001;
    this.postprocessing.bokeh.uniforms["maxblur"].value = 0.7;
  };

  handleWindowResize = () => {
    if (this.props.loadingFnished) {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      //setting postprocesing resolution after window resize
      this.composer1.setSize(width, height);
      var pixelRatio = this.renderer.getPixelRatio();
      this.fxaaPass.material.uniforms["resolution"].value.x =
        1 / (width * pixelRatio);
      this.fxaaPass.material.uniforms["resolution"].value.y =
        1 / (height * pixelRatio);
    }
    this.props.onScrollBarTrack();
  };

  sceneSwitch = () => {
    if (this.props.actualScene === 0) {
      this.hideSceneModels(this.scene, this.assets_names, "scene1", true);
      this.hideSceneModels(this.scene, this.assets_names, "scene2", false);
      this.hideSceneModels(this.scene, this.assets_names, "scene3", false);

      this.bloomPass.threshold = 0;
      this.bloomPass.strength = 6;
      this.bloomPass.radius = 0.9;
      this.camera.fov = 75;
      this.camera.near = 0.01;

      this.cameraMoveVector = { x: 0, y: 400, z: 20, scal: 0.032 };

      //fixing camera moves
      this.bezierTime = 0.0001; //scene 1 angle
      this.bezierTime2 = 0.0001; //scene 2 angle
      this.carViewTime.time = 0; // scene 3 car

      if (this.props.quality === 0) {
        this.rain.visible = false;
        this.flash.power = 300;
      }
    } else if (this.props.actualScene === 1) {
      this.hideSceneModels(this.scene, this.assets_names, "scene1", false);
      this.hideSceneModels(this.scene, this.assets_names, "scene2", true);
      this.hideSceneModels(this.scene, this.assets_names, "scene3", false);

      this.bloomPass.threshold = 0.1;
      this.bloomPass.strength = 4;
      this.bloomPass.radius = 0.5;
      this.camera.fov = 35;
      this.camera.near = 0.1;

      this.cameraMoveVector = { x: -2020, y: 110, z: 1020, scal: 0.2 }; //straight

      //fixing camera moves
      this.bezierTime2 = 0.0001; //scene 2 angle
      this.carViewTime.time = 0; // scene 3 car
    } else if (this.props.actualScene === 2) {
      this.hideSceneModels(this.scene, this.assets_names, "scene1", false);
      this.hideSceneModels(this.scene, this.assets_names, "scene2", true);
      this.hideSceneModels(this.scene, this.assets_names, "scene3", false);

      this.bloomPass.threshold = 0.1;
      this.bloomPass.strength = 4;
      this.bloomPass.radius = 0.5;
      this.camera.fov = 35;
      this.camera.near = 0.1;

      this.cameraMoveVector = { x: -409, y: -1580, z: 1429, scal: 0.2 };

      // this.cameraMoveVector = { x: -150, y: -2300, z: 1150, scal: 0.2 }; save for old

      //fixing camera moves
      this.bezierTime = 0.9999; //scene 1 angle
      this.carViewTime.time = 0; // scene 3 car
    } else if (this.props.actualScene === 3) {
      this.hideSceneModels(this.scene, this.assets_names, "scene1", false);
      this.hideSceneModels(this.scene, this.assets_names, "scene2", false);
      this.hideSceneModels(this.scene, this.assets_names, "scene3", true);

      this.bloomPass.threshold = 0.1;
      this.bloomPass.strength = 4;
      this.bloomPass.radius = 0.5;
      this.camera.fov = 35;
      this.camera.near = 0.1;

      this.cameraMoveVector = { x: 0, y: 200, z: 1000, scal: 0.132 };

      //fixing camera moves
      this.bezierTime = 0.9999; //scene 1 angle
      this.bezierTime2 = 0.9999; //scene 2 angle
    }

    if (this.props.actualScene !== this.previousScene) {
      this.cameraOrientation = getExactPointLookAt(
        this.props.scrollTrackPercentage,
        this.props.scrollTrackSet,
        this.props.actualScene,
        this.cameraPoints,
        this.carViewTime
      );
    }

    if (this.props.actualScene === 1 || this.props.actualScene === 2) {
      if (this.props.quality === 0) {
        let obj = this.scene.getObjectByName("mirrorReflection");
        if (obj) {
          this.scene.remove(obj);

          for (let i = 0; i < this.assets_names["scene2"].length; i++) {
            if (obj.uuid === this.assets_names["scene2"][i]) {
              this.assets_names["scene2"].splice(i, 1);
              break;
            }
          }
        }
      }
    }

    this.previousScene = this.props.actualScene;

    this.camera.updateProjectionMatrix();
  };

  hideSceneModels = (scene, assets_names, sceneName, hideBool) => {
    for (let i = 0; i < assets_names[sceneName].length; i++) {
      let obj = scene.getObjectByProperty("uuid", assets_names[sceneName][i]);
      if (obj) {
        obj.visible = hideBool;
      }
    }
  };

  detectChangeScene = () => {
    const { scrollTrackSet } = this.props;

    if (this.props.actualScene !== scrollTrackSet) {
      if (!this.fadeInScene) {
        this.fadeOutScene = true;
      }
    }
  };

  fadeOutSceneFunc = (speed) => {
    if (this.fadeOutScene) {
      if (this.renderer.toneMappingExposure - speed > 0) {
        this.renderer.toneMappingExposure -= speed;
      } else {
        this.renderer.toneMappingExposure = 0;
        this.props.onActualSceneChange(this.props.scrollTrackSet);

        if (this.props.actualScene === 1) {
          this.changePozCamera = true;
        } else {
          this.changePozCamera = false;
        }

        if (this.props.actualScene === 2) {
          this.changePozCamera2 = true;
        } else {
          this.changePozCamera2 = false;
        }

        this.sceneSwitch();

        this.fadeOutScene = false;

        this.fadeInScene = true;
      }
    }
  };

  fadeInSceneFunc = (speed) => {
    if (this.fadeInScene) {
      if (this.renderer.toneMappingExposure + speed < 0.7) {
        this.renderer.toneMappingExposure += speed;
      } else {
        this.fadeInScene = false;
        this.renderer.toneMappingExposure = 0.7;
      }
    }
  };

  animationQuality = (quality) => {
    //setting posproccesing render depending on choosed quality

    if (this.props.qualityChange) {
      if (quality === 0) {
        //Scene 0
        this.flash.distance = 1000;
        this.flash.decay = 2;

        this.cloudParticles[0].material.color.setHex(0x00c6ff);

        this.rain.visible = false;
        this.flash.power = 300;
        let obj = this.scene.getObjectByName("mirrorReflection");
        if (obj) {
          this.scene.remove(obj);

          for (let i = 0; i < this.assets_names["scene2"].length; i++) {
            if (obj.uuid === this.assets_names["scene2"][i]) {
              this.assets_names["scene2"].splice(i, 1);
              break;
            }
          }
        }

        obj = this.scene.getObjectByName("recrute_text");
        obj.material.color.setHex(0xe00049);
        obj.material.emissive.setHex(0xca0041);
        obj.material.opacity = 1;

        obj = this.scene.getObjectByName("code_text");
        obj.material.color.setHex(0x00fcff);
        obj.material.emissive.setHex(0x00fcff);
        obj.material.opacity = 1.5;

        obj = this.scene.getObjectByName("cyane_lights");
        obj.material.color.setHex(0x00fcff);
        obj.material.emissive.setHex(0x00fcff);

        obj = this.scene.getObjectByName("logo_layer_2");
        obj.material.color.setHex(0xd9d9d9);
        obj.material.emissive.setHex(0xd9d9d9);

        obj = this.scene.getObjectByName("opportunity_text");
        obj.material.color.setHex(0x00f6ff);

        obj = this.scene.getObjectByName("hammer_girl");
        obj.material.color.setHex(0xb900ff);
        obj.material.emissive.setHex(0xb900ff);
        obj.material.opacity = 0.6;

        obj = this.scene.getObjectByName("hammer_lamp");
        obj.power = 250;
        obj.color.setHex(0xd300e6);

        //Scene 1/2

        obj = this.scene.getObjectByName("s12Blue");
        obj.power = 30;
        obj.color.setHex(0x009bbc);
        obj.decay = 2;

        obj = this.scene.getObjectByName("s12Violet");
        obj.power = 30;
        obj.color.setHex(0xab00bf);
        obj.decay = 2;

        obj = this.scene.getObjectByName("s12Red");
        obj.power = 30;
        obj.color.setHex(0xa80000);
        obj.decay = 2;

        obj = this.scene.getObjectByName("wall_roof");
        for (let i = 0; i < obj.children.length; i++) {
          if (obj.children[i].name === "Cube.007_1") {
            obj.children[i].material.color.setHex(0x00ffff);
            obj.children[i].material.emissive.setHex(0x00ffff);
            obj.children[i].material.specular.setHex(0xffffff);
            break;
          }
        }

        obj = this.scene.getObjectByName("mirror_elements");
        for (let i = 0; i < obj.children.length; i++) {
          obj.children[i].material.color.setHex(0xa10000);
          obj.children[i].material.emissive.setHex(0x7d000e);
        }
        //Scene 3

        obj = this.scene.getObjectByName("copyrights");
        obj.material.color.setHex(0x990000);
        obj.material.emissive.setHex(0x74000d);

        obj = this.scene.getObjectByName("light_back");
        obj.material.emissive.setHex(0xff0000);

        obj = this.scene.getObjectByName("light_front");
        obj.material.emissive.setHex(0xffffff);

        obj = this.scene.getObjectByName("ground2");
        for (let i = 0; i < obj.children.length; i++) {
          if (obj.children[i].name === "Cylinder.003_1") {
            obj.children[i].material.emissive.setHex(0xffffff);
            break;
          }
        }
      } else {
        //Scene 0
        this.flash.distance = 500;
        this.flash.decay = 1.7;

        this.cloudParticles[0].material.color.setHex(0x004851);

        let obj = this.scene.getObjectByName("mirrorReflection");
        if (!obj) {
          obj = this.scene.getObjectByName("mirror");
          this.scene.add(createMirror(obj, this.assets_names));

          obj = this.scene.getObjectByName("mirrorReflection");
          obj.visible = false;
        }
        if (this.props.actualScene === 0) {
          this.rain.visible = true;
        } else if (
          this.props.actualScene === 1 ||
          this.props.actualScene === 2
        ) {
          obj = this.scene.getObjectByName("mirrorReflection");
          obj.visible = true;
        }

        obj = this.scene.getObjectByName("recrute_text");
        obj.material.color.setHex(0x770027);
        obj.material.emissive.setHex(0x7c0028);
        obj.material.opacity = 1.5;

        obj = this.scene.getObjectByName("code_text");
        obj.material.color.setHex(0x006d6c);
        obj.material.emissive.setHex(0x006d6c);
        obj.material.opacity = 1;

        obj = this.scene.getObjectByName("cyane_lights");
        obj.material.color.setHex(0x003b51);
        obj.material.emissive.setHex(0x003b51);

        obj = this.scene.getObjectByName("logo_layer_2");
        obj.material.color.setHex(0x606060);
        obj.material.emissive.setHex(0x606060);

        obj = this.scene.getObjectByName("opportunity_text");
        obj.material.color.setHex(0x006d6c);

        obj = this.scene.getObjectByName("hammer_girl");
        obj.material.color.setHex(0x280037);
        obj.material.emissive.setHex(0x280037);
        obj.material.opacity = 0.32;

        obj = this.scene.getObjectByName("hammer_lamp");
        obj.power = 100;
        obj.color.setHex(0x780079);

        //Scene 1/2

        if (quality === 1) {
          obj = this.scene.getObjectByName("s12Blue");
          obj.power = 12.6;
          obj.color.setHex(0x009bbc);
          obj.decay = 2;

          obj = this.scene.getObjectByName("s12Violet");
          obj.power = 15;
          obj.color.setHex(0xab00bf);
          obj.decay = 2;

          obj = this.scene.getObjectByName("s12Red");
          obj.power = 20;
          obj.color.setHex(0xa80000);
          obj.decay = 2;
        } else {
          obj = this.scene.getObjectByName("s12Blue");
          obj.power = 12.6;
          obj.color.setHex(0x009bbc);
          obj.decay = 1;

          obj = this.scene.getObjectByName("s12Violet");
          obj.power = 12.6;
          obj.color.setHex(0xab00bf);
          obj.decay = 1;

          obj = this.scene.getObjectByName("s12Red");
          obj.power = 15;
          obj.color.setHex(0xa80000);
          obj.decay = 1;
        }

        obj = this.scene.getObjectByName("wall_roof");
        for (let i = 0; i < obj.children.length; i++) {
          if (obj.children[i].name === "Cube.007_1") {
            obj.children[i].material.color.setHex(0x009c9a);
            obj.children[i].material.emissive.setHex(0x009c9a);
            obj.children[i].material.specular.setHex(0xb9b9b9);
            break;
          }
        }

        obj = this.scene.getObjectByName("mirror_elements");
        for (let i = 0; i < obj.children.length; i++) {
          obj.children[i].material.color.setHex(0x450000);
          obj.children[i].material.emissive.setHex(0x1a0003);
        }

        //Scene 3

        obj = this.scene.getObjectByName("copyrights");
        obj.material.color.setHex(0x450000);
        obj.material.emissive.setHex(0x1a0003);

        obj = this.scene.getObjectByName("light_back");
        obj.material.emissive.setHex(0xc70000);

        obj = this.scene.getObjectByName("light_front");
        obj.material.emissive.setHex(0xe7e7e7);

        obj = this.scene.getObjectByName("ground2");
        for (let i = 0; i < obj.children.length; i++) {
          if (obj.children[i].name === "Cylinder.003_1") {
            obj.children[i].material.emissive.setHex(0xe7e7e7);
            break;
          }
        }
      }

      //

      this.props.onQalitySceneSwitch();
    }
    //

    if (quality === 0) {
      this.renderer.render(this.scene, this.camera);
    } else if (quality === 1) {
      this.renderBloom(true);
      this.finalComposer.render();
    } else if (quality === 2) {
      this.renderBloom(false);
      this.postprocessing.composer.render(0.1);
    }
  };

  changingScenes = () => {
    this.detectChangeScene();

    this.fadeOutSceneFunc(0.0318181818181818);
    this.fadeInSceneFunc(0.0318181818181818);
  };

  startAnimationLoop = () => {
    if (this.props.loadingFnished) {
      if (Date.now() >= this.timeTarget) {
        // frame limiting
        this.changingScenes(); // detecting and fading systems

        this.delta = this.clock.getDelta();
        if (this.mixer[0]) {
          this.mixer[0].update(this.delta);
        }

        const {
          scene,
          camera,
          delta,
          flash,
          rain,
          rainGeo,
          cloudParticles,
          trainGroup,
          trainFinished,
          carsGroup,
          tubeGeometry,
        } = this;

        if (this.props.actualScene === 0) {
          if (this.props.quality !== 0) {
            animationSky(delta, flash, rain, rainGeo, cloudParticles);
          }

          this.trainFinished = trainAnimation(scene, trainGroup, trainFinished);
          carAnimation(scene, carsGroup);
          cameraMoveHuman(camera, tubeGeometry, this.cameraMoveVector);
        } else if (this.props.actualScene === 1) {
          this.calcBezierCurveAtScene1(); // curve scene 1 angle to straith mirror
          this.scene1profileCertSkills(); //fading opacity of mirror text profile cert skills
          cameraMoveHuman(camera, tubeGeometry, this.cameraMoveVector);
        } else if (this.props.actualScene === 2) {
          this.calcBezierCurveAtScene2(); // curve scene 1 angle to straith mirror
          cameraMoveHuman(camera, tubeGeometry, this.cameraMoveVector);
        } else if (this.props.actualScene === 3) {
          this.scene3CarCameraAnimations(camera); //camera fading/moving/look and time/lap calcs
        }

        // calc animation from existing cam point to destiny scroll percentage
        this.cameraOrientation = cameraAnimateLookAt(
          camera,
          this.props.scrollTrackPercentage,
          this.props.scrollTrackSet,
          this.props.actualScene,
          this.cameraOrientation,
          this.cameraPoints,
          this.carViewTime
        );
        this.calcFocus(camera); //get distance from camera to lookat point

        this.animationQuality(this.props.quality);

        this.timeTarget += this.LimiterDt; //limit fps
        if (Date.now() >= this.timeTarget) {
          this.timeTarget = Date.now();
        }
      }
    } else {
      window.scrollTo(0, 0);

      if (
        this.carsGroup &&
        this.cloudParticles &&
        this.trainGroup &&
        this.cameraPoints.length >= 13 &&
        this.assets_names.scene1.length === 130 &&
        this.assets_names.scene2.length === 32 &&
        this.assets_names.scene3.length === 25
      ) {
        this.sceneSwitch();
        this.fadeInScene = true;

        this.props.onLoadingSceneFinish();
      }
    }

    /* console.log(
      this.assets_names.scene1.length,
      this.assets_names.scene2.length,
      this.assets_names.scene3.length
    ); */

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

    this.props.onFpsUpdate();
  };

  scene3CarCameraAnimations = (camera) => {
    const lapHelper = this.carViewTime.lap;

    const CarTimeLap = cameraMoveCarTimerLap(this.carViewTime);
    this.carViewTime.time = CarTimeLap.time;
    this.carViewTime.lap = CarTimeLap.lap;

    if (!this.fadeOutScene && !this.fadeInScene) {
      this.renderer.toneMappingExposure = fadeCarView(
        this.renderer.toneMappingExposure,
        this.carViewTime
      );
    }

    if (lapHelper !== CarTimeLap.lap) {
      this.cameraOrientation = getExactPointLookAt(
        this.props.scrollTrackPercentage,
        this.props.scrollTrackSet,
        this.props.actualScene,
        this.cameraPoints,
        this.carViewTime
      );
    }

    cameraMoveCarExposition(
      camera,
      this.carViewTime,
      this.curveCarSideView,
      this.curveCarFrontView,
      this.curveCarBackView,
      this.curveCarCircleView
    );
  };

  scene1profileCertSkills = () => {
    const opacitySpeed = 0.05;
    if (
      this.props.scrollTrackPercentage >= 10 &&
      this.props.scrollTrackPercentage < 26.6
    ) {
      if (this.mirrorSubjects[0].opacity < 1) {
        this.mirrorSubjects[0].opacity += opacitySpeed;
      }

      if (this.mirrorSubjects[1].opacity > 0.15) {
        this.mirrorSubjects[1].opacity -= opacitySpeed;
      }
      if (this.mirrorSubjects[2].opacity > 0.15) {
        this.mirrorSubjects[2].opacity -= opacitySpeed;
      }
    } else if (
      this.props.scrollTrackPercentage >= 26.6 &&
      this.props.scrollTrackPercentage < 59.3
    ) {
      if (this.mirrorSubjects[0].opacity > 0.15) {
        this.mirrorSubjects[0].opacity -= opacitySpeed;
      }
      if (this.mirrorSubjects[1].opacity < 1) {
        this.mirrorSubjects[1].opacity += opacitySpeed;
      }
      if (this.mirrorSubjects[2].opacity > 0.15) {
        this.mirrorSubjects[2].opacity -= opacitySpeed;
      }
    } else if (
      this.props.scrollTrackPercentage >= 59.3 &&
      this.props.scrollTrackPercentage < 90
    ) {
      if (this.mirrorSubjects[0].opacity > 0.15) {
        this.mirrorSubjects[0].opacity -= opacitySpeed;
      }
      if (this.mirrorSubjects[1].opacity > 0.15) {
        this.mirrorSubjects[1].opacity -= opacitySpeed;
      }
      if (this.mirrorSubjects[2].opacity < 1) {
        this.mirrorSubjects[2].opacity += opacitySpeed;
      }
    } else {
      if (this.mirrorSubjects[0].opacity > 0.15) {
        this.mirrorSubjects[0].opacity -= opacitySpeed;
      }
      if (this.mirrorSubjects[1].opacity > 0.15) {
        this.mirrorSubjects[1].opacity -= opacitySpeed;
      }
      if (this.mirrorSubjects[2].opacity > 0.15) {
        this.mirrorSubjects[2].opacity -= opacitySpeed;
      }
    }
  };

  calcBezierCurveAtScene1 = () => {
    const curveValue = cameraMoveCurveScene1(
      this.props.scrollTrackSet,
      this.props.scrollTrackPercentage,
      this.props.actualScene,
      this.bezierTime,
      this.changePozCamera,
      this.fadeOutScene
    );

    if (curveValue) {
      this.bezierTime = curveValue.bezierTime;
      this.cameraMoveVector.x = curveValue.x;
      this.cameraMoveVector.y = curveValue.y;
      this.cameraMoveVector.z = curveValue.z;
    }
  };

  calcBezierCurveAtScene2 = () => {
    const curveValue = cameraMoveCurveScene2(
      this.props.scrollTrackSet,
      this.props.scrollTrackPercentage,
      this.props.actualScene,
      this.bezierTime2,
      this.changePozCamera2,
      this.fadeOutScene
    );

    if (curveValue) {
      this.bezierTime2 = curveValue.bezierTime;
      this.cameraMoveVector.x = curveValue.x;
      this.cameraMoveVector.y = curveValue.y;
      this.cameraMoveVector.z = curveValue.z;
    }
  };

  calcFocus = (camera) => {
    if (this.cameraOrientation) {
      const distance = camera.position
        .clone()
        .distanceTo(this.cameraOrientation);
      this.postprocessing.bokeh.uniforms["focus"].value = distance;
    }
  };

  renderBloom = (mask) => {
    if (mask === true) {
      this.scene.traverse(this.darkenSelectiveBloomed, mask);
      this.composer1.render();
      this.scene.traverse(this.restoreMaterial);
    } else {
      this.scene.traverse(this.darkenAllBloomed, mask);
      this.composer1.render();
      this.scene.traverse(this.restoreMaterial);
    }
  };
  darkenSelectiveBloomed = (obj) => {
    if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {
      this.materials[obj.uuid] = obj.material;
      obj.material = this.darkMaterial;
    }
  };
  darkenAllBloomed = (obj) => {
    if (
      obj.name.includes("Circle.004_") ||
      obj.name === "Cylinder.003_0" ||
      obj.name.includes("Plane.012_1")
    ) {
      this.materials[obj.uuid] = obj.material;
      obj.material = this.darkMaterial;
    }
  };
  restoreMaterial = (obj, napis) => {
    if (this.materials[obj.uuid]) {
      obj.material = this.materials[obj.uuid];
      delete this.materials[obj.uuid];
    }
  };

  render() {
    return <div id="three-render-cage" ref={(ref) => (this.mount = ref)}></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    fps: state.fps.fpsCounter,
    quality: state.quality.qualitySet,
    scrollTrackSet: state.s_track.scrollTrackSet,
    scrollTrackPercentage: state.s_track.scrollTrackPercentage,
    percentageExact: state.s_track.percentageExact,
    loadingFnished: state.loadScene.loadingFnished,
    actualScene: state.s_track.actualScene,
    qualityChange: state.quality.qualityChange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFpsUpdate: () => dispatch({ type: actionTypes.FpsUpdate }),
    onLoadingProgress: (value) =>
      dispatch({ type: actionTypes.LoadingSceneProgress, progress: value }),
    onLoadingSceneFinish: () =>
      dispatch({ type: actionTypes.LoadingSceneFinished }),
    onManualChange: (element) =>
      dispatch({
        type: actionTypes.ManualBarTracker,
        scrollElement: element,
      }),
    onActualSceneChange: (value) =>
      dispatch({ type: actionTypes.ScrollActualScene, scrollTrack: value }),
    onScrollBarTrack: () =>
      dispatch({
        type: actionTypes.ScrollBarTracker,
      }),

    onQalitySceneSwitch: () =>
      dispatch({ type: actionTypes.QualityChangeNotification }),

    onQalityDetect: () => dispatch({ type: actionTypes.QualityDetect }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Three_initial);
