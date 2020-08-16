export const cameraMoveHuman = (camera, curveGeometry, cameraMoveVector) => {
  var time = Date.now();
  var looptime = 40 * 1000;
  var t = (time % looptime) / looptime;

  var pos = curveGeometry.parameters.path.getPointAt(t);

  pos.x += cameraMoveVector.x; //left right
  pos.y += cameraMoveVector.y; //top bottom
  pos.z += cameraMoveVector.z; //forweward backword
  pos.multiplyScalar(cameraMoveVector.scal);

  camera.position.copy(pos);
};
