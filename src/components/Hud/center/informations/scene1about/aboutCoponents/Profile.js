import React from "react";
import { connect } from "react-redux";

const Profile = (props) => {
  return (
    <div id="ProfileContener">
      <div className="profileTittle">
        {props.languageSet === "en" ? "Full Name" : null}
        {props.languageSet === "pl" ? "Imię i Nazwisko" : null}
      </div>
      <div className="profileText">Łukasz Macoń</div>

      <div id="profileSeparate">
        <div className="profileTittle">
          {props.languageSet === "en" ? "SPECIALIZATION" : null}
          {props.languageSet === "pl" ? "specjalizacja" : null}
        </div>
        <div className="profileText">frontend developer</div>
      </div>

      <div className="profileTittle">
        {props.languageSet === "en" ? "SHORT STORY" : null}
        {props.languageSet === "pl" ? "krótka historia" : null}
      </div>
      <div className="profileText">
        {props.languageSet === "en"
          ? `I have been PROGRAMMING SINCE 2014. FIRST I WAS CODING IN JAVA, THEN I DECIDED TO FOCUS ON WEB TECHNOLOGIES. I’VE DONE a few FREELANCE PROJECTS, BUT MAINLY I WAS DEEPLY INVOLVED IN MY OWN PROJECT INVIDIA- 3D PRINTED EYEWEAR WHICH I'M DESIGNING AND producing. ALL MY PROJECTS were CREATED BY MYSELF FROM the beginning to end – CONCEPT, DESIGN, GRAPHICS, VISUALIZATION, DATABASE, FRONTEND AND BACKEND.`
          : null}
        {props.languageSet === "pl"
          ? "Programuję od 2014 ROKU. na początku programowałem w JAVIE, A NASTĘPNIE przestawiłem się NA TECHNOLOGIE INTERNETOWE. ZREALIZOWAŁEM kilka zleceń FREELANcerskich, ALE GŁÓWNIE rozwijałem mój PROJEKT INVIDIA - OKULARY DRUKOWANE W 3D, KTÓRE TWORZĘ. WSZYSTKIE MOJE PROJEKTY WYKONywałem dotąd sam- KONCEPCJA, PROJEKT, GRAFIKA, WIZUALIZACJA, BAZA DANYCH, frontend I BACKEND."
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(Profile));
