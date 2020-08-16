const animationSky = (delta, flash, rain, rainGeo, cloudParticles) => {
  //  if (cloudParticles) {
  // rotating clouds (effect look like clouds are moving)
  let sp = cloudParticles.length;
  while (sp--) {
    cloudParticles[sp].rotation.z += delta * 0.2;
  }

  // adding animation on rain droplets
  rainGeo.vertices.forEach((p) => {
    p.velocity -= 0.1 + Math.random() * 0.1;
    p.y += p.velocity;
    if (p.y < -70) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  rainGeo.verticesNeedUpdate = true;
  rain.rotation.y += 0.002;

  // creating storm effect on clouds
  if (Math.random() > 0.97 || flash.power > 100) {
    if (flash.power < 100) {
      flash.position.set(
        Math.random() * 400 - 100,
        400 + Math.random() * 300,
        100
      );
    }
    flash.power = 50 + Math.random() * 500;
  }
  //  }
};

export default animationSky;
