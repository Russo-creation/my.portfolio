const virtualScrollTracker = (scrollPane, scrollbar) => {
  if (scrollPane !== null && scrollbar !== null) {
    const scrollPaneHeightAll = scrollPane.scrollHeight; // all height of scrolled div
    const scrollPaneHeightWindow = scrollPane.offsetHeight; // visible view port of scolled div
    const scrollPaneScrollTop = scrollPane.scrollTop; // actual distance scrolled from top div

    // calculating scrolltrack height
    let ScrollBarHeight =
      scrollPaneHeightWindow * (scrollPaneHeightWindow / scrollPaneHeightAll);

    // setting minimal scrollbar height
    if (ScrollBarHeight <= 40) {
      ScrollBarHeight = 40;
    }

    // calculating positing scollbar from top
    let val_srcollbar_poz_y =
      (scrollPaneScrollTop / (scrollPaneHeightAll - scrollPaneHeightWindow)) *
      (scrollPaneHeightWindow - ScrollBarHeight);

    // applying values to style
    scrollbar.style.height = ScrollBarHeight + "px";
    scrollbar.style.top = Math.ceil(val_srcollbar_poz_y) + "px";
  }
};

export default virtualScrollTracker;
