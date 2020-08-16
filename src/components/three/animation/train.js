const trainAnimation = (scene, trainGroup, trainFinished) => {
  // if (trainGroup) {
  if (!trainFinished) {
    for (let i = 0; i < trainGroup.length; i++) {
      trainGroup[i].obj.position.x -= 10.1;
      if (trainGroup[i].obj.name === "train") {
        if (trainGroup[i].obj.position.x < -1500) {
          return true;
          // trainFinished = true;
        }
      }
    }
  } else {
    if (Math.random() > 0.99) {
      // trainFinished = false;
      for (let i = 0; i < trainGroup.length; i++) {
        trainGroup[i].obj.position.x = trainGroup[i].x;
      }
      return false;
    }
  }
  //  }
};

export default trainAnimation;
