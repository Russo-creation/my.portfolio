const carAnimation = (scene, carsGroup) => {
  //  if (carsGroup) {
  for (let i = 0; i < carsGroup.length; i++) {
    if (carsGroup[i].finished) {
      if (Math.random() > 0.99) {
        carsGroup[i].car_obj.position.z = carsGroup[i].car_poz.z;
        carsGroup[i].car_obj.position.y = carsGroup[i].car_poz.y;
        carsGroup[i].car_obj.position.x = carsGroup[i].car_poz.x;

        carsGroup[i].light_obj.position.z = carsGroup[i].light_poz.z;
        carsGroup[i].light_obj.position.y = carsGroup[i].light_poz.y;
        carsGroup[i].light_obj.position.x = carsGroup[i].light_poz.x;

        carsGroup[i].speed = randomFloat(6, 14);
        carsGroup[i].finished = false;
      }
    } else {
      carsGroup[i].car_obj.position.z -= carsGroup[i].speed;

      carsGroup[i].light_obj.position.z -= carsGroup[i].speed;

      if (carsGroup[i].name === "car000") {
        carsGroup[i].car_obj.position.y -= 0.125;
        carsGroup[i].light_obj.position.y -= 0.5;
      } else if (carsGroup[i].name === "car001") {
        carsGroup[i].car_obj.position.x -= 0.1;
        carsGroup[i].light_obj.position.x -= 0.4;
      }

      if (carsGroup[i].car_obj.position.z < -800) {
        carsGroup[i].finished = true;
      }
    }
  }
  //  }
};

const randomFloat = (min, max) => {
  return min + (max - min) * Math.random();
};

export default carAnimation;
