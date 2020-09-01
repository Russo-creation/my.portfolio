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
          ? `I started to learn programming in 2014. First work in Java, then switched to web technologies. 
          I’ve done couple freelance projects, but mainly work for my INVIDIA project-
          3D printed eyewear which I create. In all my projects I made all things by myself – concept, design, graphics, 
          visualization, database, frontend and backend.`
          : null}
        {props.languageSet === "pl"
          ? "PROGRAMOWANIA ZACZĄŁEM SIĘ uczyć W 2014 ROKU. na początku programowałem w JAVIE, A NASTĘPNIE przestawiłem się NA TECHNOLOGIE INTERNETOWE. ZREALIZOWAŁEM kilka zleceń FREELANcerskich, ALE GŁÓWNIE rozwijałem mój PROJEKT INVIDIA - OKULARY DRUKOWANE W 3D, KTÓRE TWORZĘ. WSZYSTKIE MOJE PROJEKTY WYKONywałem dotąd sam- KONCEPCJA, PROJEKT, GRAFIKA, WIZUALIZACJA, BAZA DANYCH, frontend I BACKEND."
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