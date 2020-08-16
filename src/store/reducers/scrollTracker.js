import * as actionTypes from "../actions";

const intialState = {
  scrollTrackSet: 0,
  scrollTrackPercentage: 0,
  scrollTrackPercentageExact: 0,
  actualScene: 0,
  scrollTrackerList: [
    {
      lang: "pl",
      list: [
        { varName: "start", id: "contentStart" },
        { varName: "o mnie", id: "contentAbout" },
        { varName: "projekty", id: "contentProjects" },
        { varName: "kontakt", id: "contentContact" },
      ],
    },
    {
      lang: "en",
      list: [
        { varName: "start", id: "contentStart" },
        { varName: "about", id: "contentAbout" },
        { varName: "projects", id: "contentProjects" },
        { varName: "contact", id: "contentContact" },
      ],
    },
  ],
};

const scrollPosition = (scrollTrackerList) => {
  for (let i = scrollTrackerList[0].list.length - 1; i >= 0; i--) {
    const element = document.getElementById(scrollTrackerList[0].list[i].id);
    if (element !== null) {
      const bounding = element.getBoundingClientRect();

      if (bounding.top <= 0) {
        let elementHeight = bounding.height;

        if (i === scrollTrackerList[0].list.length - 1) {
          elementHeight = elementHeight - window.innerHeight;
        }

        const mathPercentage = -(bounding.top / elementHeight) * 100;
        return {
          index: i,
          percentage: mathPercentage.toFixed(2) * 1,
          percentageExact: mathPercentage / 100,
        };
      }
    } else {
      return {
        index: 0,
        percentage: 0,
        percentageExact: 0,
      };
    }
  }
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.ScrollBarTracker:
      let scrollTracker = scrollPosition(state.scrollTrackerList);

      return {
        ...state,
        scrollTrackPercentage: scrollTracker.percentage,
        scrollTrackPercentageExact: scrollTracker.percentageExact,
        scrollTrackSet: scrollTracker.index,
      };
    case actionTypes.ManualBarTracker:
      if (action.scrollElement !== state.scrollTrackSet) {
        const element = document.getElementById(
          state.scrollTrackerList[0].list[action.scrollElement].id
        );
        if (element !== null) {
          element.scrollIntoView();
        }

        return state;
      } else {
        return state;
      }

    case actionTypes.ScrollActualScene:
      return {
        ...state,
        actualScene: action.scrollTrack,
      };

    default:
      return state;
  }
};

export default reducer;
