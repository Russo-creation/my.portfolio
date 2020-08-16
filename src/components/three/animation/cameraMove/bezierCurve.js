const bezierCurve = (v0, v1, v2, time) => {
  //v0 is a start point
  //v1 is a contoll point middle
  //v2 is a end point
  return (
    (1 - time) * (1 - time) * v0 + 2 * (1 - time) * time * v1 + time * time * v2
  );
};

export default bezierCurve;
