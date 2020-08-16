import React from "react";
import { connect } from "react-redux";

import ProjectList from "./ProjectList";
import ProjectItem from "./ProjectItem";

const PopulateProject = (props) => {
  const projectsLenght = ProjectList.length;
  const projectItem = ProjectList.map((item, index) => (
    <ProjectItem
      key={index}
      tittle={item.tittle}
      number={index + 1 + "/" + projectsLenght}
      addres={item.addres}
      qr={item.qr}
      image={item.image}
      technology={item.technology}
      description={item.description}
      intresting={item.intresting}
      languageSet={props.languageSet}
    />
  ));

  return <>{projectItem}</>;
};

const mapStateToProps = (state) => {
  return {
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(PopulateProject));
