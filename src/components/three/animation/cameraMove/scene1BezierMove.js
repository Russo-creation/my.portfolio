import bezierCurve from "./bezierCurve";

export const cameraMoveCurveScene1 = (
  scrollTrackSet,
  scrollTrackPercentage,
  actualScene,
  bezierTime,
  changePozCamera,
  fadeOutScene
) => {
  if (changePozCamera && !fadeOutScene) {
    if (actualScene !== scrollTrackSet) {
      if (actualScene > scrollTrackSet) {
        scrollTrackPercentage = 0;
      } else {
        scrollTrackPercentage = 100;
      }
    }

    const tempTime = bezierTime;

    if (scrollTrackPercentage < 26.6) {
      const speed = bezierCurve(0.001, 0.9, 0.999, bezierTime) / 30;

      if (bezierTime - speed <= 0.001) {
        bezierTime = 0.001;
      } else {
        bezierTime -= speed;
      }
    } else {
      const speed = bezierCurve(0.999, 0.9, 0.001, bezierTime) / 30;

      if (bezierTime + speed >= 0.999) {
        bezierTime = 0.999;
      } else {
        bezierTime += speed;
      }
    }

    if (tempTime !== bezierTime) {
      const x = bezierCurve(-2020, -1520, -440, bezierTime);
      const y = bezierCurve(110, 110, -160, bezierTime);
      const z = bezierCurve(1020, 1970, 2800, bezierTime);

      return { bezierTime, x, y, z };
    }

    // this.cameraMoveVector = { x: -2020, y: 110, z: 1020, scal: 0.2 }; //straight początkowy
    //-1520, y: 110, z: 1970
    // this.cameraMoveVector = { x: -440, y: -160, z: 2800, scal: 0.2 }; // angle koncowy
  }
};
