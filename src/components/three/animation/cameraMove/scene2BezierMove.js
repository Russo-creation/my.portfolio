import bezierCurve from "./bezierCurve";

export const cameraMoveCurveScene2 = (
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

    if (scrollTrackPercentage < 50) {
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
      const x = bezierCurve(-409, -297, -150, bezierTime);
      const y = bezierCurve(-1580, -1905, -2300, bezierTime);
      const z = bezierCurve(1429, 1265, 1150, bezierTime);

      return { bezierTime, x, y, z };
    }

    // this.cameraMoveVector = { x: -409, y: -1580, z: 1429, scal: 0.2 }; //straight początkowy
    //-550, y: -1750, z: 1550
    // this.cameraMoveVector = { x: -150, y: -2300, z: 1150, scal: 0.2 }; // angle koncowy
  }
};
