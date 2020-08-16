const moveSrcoll = (minLimit, maxLimit, element, scroll) => {
  if (element.current !== null) {
    //adding a little distances in begining and end
    minLimit += 5;
    maxLimit -= 5;

    const heightAll = element.current.scrollHeight;
    const heightWindow = element.current.offsetHeight;

    const change = (maxLimit - minLimit) / 100;
    const percentage = (scroll - minLimit) / change;

    const valueToProcent = (heightAll - heightWindow) * (percentage / 100);
    element.current.scrollTop = valueToProcent;
  }
};

export default moveSrcoll;
