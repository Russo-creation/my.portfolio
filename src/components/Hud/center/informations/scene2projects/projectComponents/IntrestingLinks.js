import React from 'react';

const IntrestingLinks = (props) => {
  return (
    <div>
      <a href={props.intresting} target="_blank" rel="noopener noreferrer">
        {props.intresting}
      </a>
    </div>
  );
};

export default IntrestingLinks;
