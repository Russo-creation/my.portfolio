import React from "react";

const CertyficateRow = (props) => {
  return (
    <a
      href={props.certyficate}
      target="_blank"
      rel="noopener noreferrer"
      className="aLink"
    >
      <div
        className={`certyficateBox${props.first ? " certyficateBoxFirst" : ""}${
          props.last ? " certyficateBoxLast" : ""
        }`}
      >
        <div className="certSymbols">
          <div className="certSmallRect">
            <div className="certBigRect">
              <div className="certIcon">{props.icon}</div>
            </div>
          </div>
        </div>
        <div className="certData">
          <div className="certDate">{props.date}</div>
          <div className="certText">{props.text}</div>
        </div>
      </div>
    </a>
  );
};

export default CertyficateRow;
