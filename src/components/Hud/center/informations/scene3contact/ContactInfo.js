import React from "react";
import { connect } from "react-redux";
import "../../../../../scss/Hud/center/information/scene3contact/contact.scss";

import { useSpring, animated } from "react-spring";

const ContactInfo = (props) => {
  const lineProps = useSpring({
    width: "0%",
    from: { width: "0%" },
    to: { width: "100%" },
  });

  const textProps = useSpring({
    opacity: 0,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 600 },
    delay: 400,
  });

  return (
    <div>
      <div id="contactLeftText">
        <animated.div style={textProps} id="contactTittle">
          {props.languageSet === "en" ? "CONTACT ME" : null}
          {props.languageSet === "pl" ? "Kontakt" : null}
        </animated.div>
        <animated.div style={lineProps} id="contactLine"></animated.div>
        <animated.div style={textProps}>
          <div>
            {props.languageSet === "en" ? "GDYNIA, POLAND" : null}
            {props.languageSet === "pl" ? "GDYNIA, POLSKA" : null}
          </div>
          <div>
            <a href="tel:+48 534 839 968">+48 534 839 968</a>
          </div>
          <div>
            <a href="mailto:luk.macon@gmail.com">luk.macon@gmail.com</a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/%C5%82ukasz-maco%C5%84-8770b91b4/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(ContactInfo));
