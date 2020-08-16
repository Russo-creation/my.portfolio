const removeCameraObj = (scene) => {
  //removing camera markers for better performance
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].name === "Scene") {
      scene.children[i].remove(scene.getObjectByName("camera_0_0"));
      scene.children[i].remove(scene.getObjectByName("camera_0_1"));
      scene.children[i].remove(scene.getObjectByName("camera_1_0"));
      scene.children[i].remove(scene.getObjectByName("camera_1_1"));
      scene.children[i].remove(scene.getObjectByName("camera_2_0"));
      scene.children[i].remove(scene.getObjectByName("camera_3_0"));
      scene.children[i].remove(scene.getObjectByName("camera_3_1"));
      scene.children[i].remove(scene.getObjectByName("camera_3_2"));
      scene.children[i].remove(scene.getObjectByName("camera_3_3"));
      scene.children[i].remove(scene.getObjectByName("camera_3_4"));
      scene.children[i].remove(scene.getObjectByName("camera_3_5"));
      scene.children[i].remove(scene.getObjectByName("camera_3_6"));
      scene.children[i].remove(scene.getObjectByName("camera_3_7"));
    }
  }
};

export default removeCameraObj;
