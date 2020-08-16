export const cameraMoveCarTimerLap = (timelap) => {
  const speed = 1 / 600; //do zmiany

  if (timelap.time + speed >= 1) {
    timelap.time = 0;

    if (timelap.lap + 1 < 4) {
      timelap.lap += 1;
    } else {
      timelap.lap = 0;
    }
  } else {
    timelap.time += speed;
  }

  return { time: timelap.time, lap: timelap.lap };
};

export const fadeCarView = (toneMappingExposure, timelap) => {
  const fpsCountPermove = 560; //do zmian

  const fadingPath = 0.15 * fpsCountPermove;
  const speed = 0.7 / fadingPath;

  if (timelap.time < 0.15) {
    if (toneMappingExposure + speed < 0.7) {
      // fadeId
      toneMappingExposure += speed;
    } else {
      toneMappingExposure = 0.7;
    }
  } else if (timelap.time > 0.85) {
    //fadeOut
    if (toneMappingExposure - speed > 0) {
      toneMappingExposure -= speed;
    } else {
      toneMappingExposure = 0;
    }
  }
  return toneMappingExposure;
};

export const cameraMoveCarExposition = (
  camera,
  timelap,
  curveCarSideView,
  curveCarFrontView,
  curveCarBackView,
  curveCarCircleView
) => {
  let pos;

  if (timelap.lap === 0) {
    pos = curveCarSideView.parameters.path.getPointAt(timelap.time);
  } else if (timelap.lap === 1) {
    pos = curveCarFrontView.parameters.path.getPointAt(timelap.time);
  } else if (timelap.lap === 2) {
    pos = curveCarBackView.parameters.path.getPointAt(timelap.time);
  } else if (timelap.lap === 3) {
    pos = curveCarCircleView.parameters.path.getPointAt(timelap.time);
  }

  camera.position.copy(pos);
};
