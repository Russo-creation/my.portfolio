import React from 'react';
import { connect } from 'react-redux';

const Profile = (props) => {
  return (
    <div id="ProfileContener">
      <div className="profileTittle">
        {props.languageSet === 'en' ? 'Full Name' : null}
        {props.languageSet === 'pl' ? 'Imię i Nazwisko' : null}
      </div>
      <div className="profileText">Łukasz Macoń</div>

      <div id="profileSeparate">
        <div className="profileTittle">
          {props.languageSet === 'en' ? 'SPECIALIZATION' : null}
          {props.languageSet === 'pl' ? 'specjalizacja' : null}
        </div>
        <div className="profileText">
          createve 3d web developer / frontend developer
        </div>
      </div>

      <div className="profileTittle">
        {props.languageSet === 'en' ? 'SHORT STORY' : null}
        {props.languageSet === 'pl' ? 'krótka historia' : null}
      </div>
      <div className="profileText">
        {props.languageSet === 'en'
          ? `My journey in programming began in 2014 developing desktop applications in Java / JavaFX. Two years later, I moved to web technologies, focusing mostly on the frontend, especially on 3D (WebGL) aspects using the three.js library, which became my passion.

          While learning web technologies, I worked mostly on my own projects (including Invidia 3D printed eyewear). In 2020, I decided to pursue a commercial career during which I participated in many exciting projects, collaborating with fascinating people from all around the world, and winning many awards in competitions such as awwwards, csswebdesign and more.`
          : null}
        {props.languageSet === 'pl'
          ? `Moja podróż w świecie programowania rozpoczęła się w 2014 roku od tworzenia aplikacji desktopowych w Java / JavaFX. Dwa lata później przeszedłem do technologii webowych, skupiając się głównie na frontendzie, a w szczególności na aspektach 3D (WebGL) przy użyciu biblioteki three.js, która stała się moją pasją.

          Podczas nauki technologii webowych pracowałem głównie nad własnymi projektami (w tym nad okularami wydrukowanymi w technologii 3D Invidia). W 2020 roku zdecydowałem się na karierę komercyjną, w trakcie której uczestniczyłem w wielu ekscytujących projektach, współpracując z fascynującymi ludźmi z całego świata i zdobywając liczne nagrody w konkursach takich jak awwwards, csswebdesign and more.`
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
