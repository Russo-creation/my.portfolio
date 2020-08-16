import * as THREE from "three";

export const cameraAnimateLookAt = (
  camera,
  scrollTrackPercentage,
  scrollTrackSet,
  actualScene,
  cameraOrientation,
  cameraPoints,
  carViewTime
) => {
  // if (cameraPoints.length >= 14) {
  //camera scenes logic with getting exact coordinations beetween 2 vectors (obj cams)
  const vert = getExactPointLookAt(
    scrollTrackPercentage,
    scrollTrackSet,
    actualScene,
    cameraPoints,
    carViewTime
  );

  //on initialize scene ist's empty
  if (!cameraOrientation) {
    cameraOrientation = vert;
  }

  //animation value
  const vert2 = calcCameraPosAnimatie(cameraOrientation, vert, 0.2);

  camera.lookAt(vert2);
  return vert2;
  //  }
};

export const getExactPointLookAt = (
  scrollTrackPercentage,
  scrollTrackSet,
  actualScene,
  cameraPoints,
  carViewTime
) => {
  // console.log(this.props.scrollTrackSet, "kind");
  //console.log(this.props.scrollTrackPercentage, "%");
  let perc = scrollTrackPercentage / 100;

  if (actualScene !== scrollTrackSet) {
    if (actualScene > scrollTrackSet) {
      perc = 0;
    } else {
      perc = 1;
    }
  }

  scrollTrackSet = actualScene;

  if (scrollTrackSet === 0) {
    //expecting ending value
    let vert = calcCameraPosExact(cameraPoints[0], cameraPoints[1], perc); //camera_0_0 , camera_0_1
    return vert;
  } else if (scrollTrackSet === 1) {
    let obj1_0 = cameraPoints[2]; //camera_1_0
    let obj1_1 = cameraPoints[3]; //camera_1_1

    if (perc <= 0.1) {
      //  console.log("travel cam 1_0 to 1_1");

      //expecting ending value
      let vert = calcCameraPosExact(
        obj1_0,
        obj1_1,
        calcCameraStops(perc, 0, 0.1)
      );

      return vert;
    } else if (perc > 0.1) {
      // console.log("hold cam 1_1");

      //expecting ending value
      let vert = calcCameraPosExact(obj1_1, obj1_1, perc);

      return vert;
    }
  } else if (scrollTrackSet === 2) {
    let obj2_0 = cameraPoints[4]; //camera_2_0
    let obj2_1 = cameraPoints[5]; //camera_2_1

    if (perc <= 0.9) {
      //console.log("hold cam 2_0");

      //expecting ending value
      let vert = calcCameraPosExact(obj2_0, obj2_0, perc);

      return vert;
    } else if (perc > 0.9) {
      //  console.log("travel cam 2_0 to 2_1");

      //expecting ending value
      let vert = calcCameraPosExact(
        obj2_0,
        obj2_1,
        calcCameraStops(perc, 0.9, 0.1)
      );

      return vert;
    }
  } else if (scrollTrackSet === 3) {
    //expecting ending value

    if (carViewTime.lap === 0) {
      return calcCameraPosExact(
        cameraPoints[6],
        cameraPoints[7],
        carViewTime.time
      ); //camera_3_0 camera_3_1
    } else if (carViewTime.lap === 1) {
      return calcCameraPosExact(
        cameraPoints[8],
        cameraPoints[9],
        carViewTime.time
      ); //camera_3_2 camera_3_3
    }
    if (carViewTime.lap === 2) {
      return calcCameraPosExact(
        cameraPoints[10],
        cameraPoints[11],
        carViewTime.time
      ); //camera_3_4 camera_3_5
    }
    if (carViewTime.lap === 3) {
      return calcCameraPosExact(
        cameraPoints[12],
        cameraPoints[13],
        carViewTime.time
      ); //camera_3_6 camera_3_7
    }
  }
};

const calcCameraPosExact = (obj0, obj1, percentage) => {
  //calc position of vector between 2 points depending on percentage scroll track
  return new THREE.Vector3(
    (obj1.position.x - obj0.position.x) * percentage + obj0.position.x,
    (obj1.position.y - obj0.position.y) * percentage + obj0.position.y,
    (obj1.position.z - obj0.position.z) * percentage + obj0.position.z
  );
};

const calcCameraPosAnimatie = (obj0, obj1, percentage) => {
  //calc position of vector between 2 points depending on percentage scroll track
  let temporayVetr = new THREE.Vector3(
    (obj1.x - obj0.x) * percentage + obj0.x,
    (obj1.y - obj0.y) * percentage + obj0.y,
    (obj1.z - obj0.z) * percentage + obj0.z
  );

  return temporayVetr;
};

const calcCameraStops = (
  actualPercentage,
  PercentageBegin,
  PercentageRange
) => {
  //helps to change actual percentage to distances between stops camera
  //  |[---](camerastop)-----|
  return (actualPercentage - PercentageBegin) * (1 / PercentageRange);
};
