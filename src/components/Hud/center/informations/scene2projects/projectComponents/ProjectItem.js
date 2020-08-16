import React from "react";
import IntrestingLinks from "./IntrestingLinks";

const ProjectItem = (props) => {
  const tehnologyList = props.technology.map((item, index) =>
    index === 0 ? item : ", " + item
  );

  const intestingList = props.intresting.map((item, index) => (
    <IntrestingLinks key={item + index} intresting={item} />
  ));

  const tittleLanguageVal = props.tittle
    .filter((item) => item.lang === props.languageSet)
    .map((item) => item.value);

  const descriptionLanguageVal = props.description
    .filter((item) => item.lang === props.languageSet)
    .map((item) => item.value);

  return (
    <>
      <div className="projectTittle">
        <div className="projectTittleLeft">{tittleLanguageVal}</div>
        <div className="projectTittleRight">{props.number}</div>
      </div>
      <div className="projectTopData">
        <div className="projectTopDataLeft">
          <a
            href={`http://${props.addres}`}
            target="_blank"
            rel="noopener noreferrer"
            className="qrLink"
          >
            <div
              className="projectQrCode"
              style={{
                backgroundImage: `url(${props.qr})`,
              }}
            ></div>
          </a>

          <div>
            {props.languageSet === "en" ? "website address" : null}
            {props.languageSet === "pl" ? "strona internetowa" : null}
          </div>
          <div>
            <a
              href={`http://${props.addres}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.addres}
            </a>
          </div>
        </div>
        <div className="projectTopDataRight">
          <a
            href={`http://${props.addres}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="projectImageSite"
              src={props.image}
              alt={props.addres}
            ></img>
          </a>
        </div>
      </div>

      <div className="projectHorizontalLine"></div>

      {tehnologyList.length > 0 ? (
        <div className="projectFoldCage">
          <div className="projectFoldTittle">
            {props.languageSet === "en" ? "Technologies" : null}
            {props.languageSet === "pl" ? "Technologie" : null}
          </div>
          <div className="projectTechnologyList">{tehnologyList}</div>
        </div>
      ) : null}

      {descriptionLanguageVal[0] !== null ? (
        <div className="projectFoldCage">
          <div className="projectFoldTittle">
            {props.languageSet === "en" ? "short description" : null}
            {props.languageSet === "pl" ? "krótki opis" : null}
          </div>
          <div className="projectTechnologyList">{descriptionLanguageVal}</div>
        </div>
      ) : null}

      {intestingList.length > 0 ? (
        <div className="projectFoldCage">
          <div className="projectFoldTittle">
            {props.languageSet === "en" ? "Might found intresting" : null}
            {props.languageSet === "pl" ? "Może Cię zainteresować" : null}
          </div>
          {intestingList}
        </div>
      ) : null}
    </>
  );
};

export default ProjectItem;
