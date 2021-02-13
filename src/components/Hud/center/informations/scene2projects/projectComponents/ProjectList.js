import qrMyPortfolio from "../../../../../../images/projects/qrMyPortfolio.png";
import qrInvidia from "../../../../../../images/projects/qrInvidia.png";
import qr3d_scans from "../../../../../../images/projects/qr3d_scans.png";
import qrSimpleHdViewer from "../../../../../../images/projects/qrSimple_hd_viewer.png";
import qrDetalsellsite from "../../../../../../images/projects/qrDetalsellsite.png";
import qrImpress from "../../../../../../images/projects/qrImpress.png";
import qrNeooptica from "../../../../../../images/projects/qrNeooptica.png";
import qrBms from "../../../../../../images/projects/qrBms.png";
import qrGithub from "../../../../../../images/projects/qrGithub.png";
import qrArtstation from "../../../../../../images/projects/qrArtstation.png";

import imageMyportolio from "../../../../../../images/projects/myportfolio.png";
import imageInvidia from "../../../../../../images/projects/invidia.png";
import image3d_scans from "../../../../../../images/projects/3d_scans.png";
import imageSimpleHdViewer from "../../../../../../images/projects/simple_hd_viewer.png";
import imageDetalsellsite from "../../../../../../images/projects/detalsellsite.png";
import imageImpress from "../../../../../../images/projects/impress.png";
import imageNeooptica from "../../../../../../images/projects/neooptica.png";
import imageBms from "../../../../../../images/projects/bms.png";
import imageGithub from "../../../../../../images/projects/github.png";
import imageArtstation from "../../../../../../images/projects/artstation.png";
//1 this portfolio page
//2 invidia eyewaer (cyberpunk -3d fitting)
//3 3d scanning face measure
//4 3d eyewear viewer hd
//5 eyewear shoop
//6 optometrist exam data
//7 pestka small website
//8 arduino due bms
//9 github
//10 artstation graphics

const ProjectList = [
  //////////////////////-------------------------My portfolio
  {
    tittle: [
      {
        lang: "pl",
        value: "my.portfolio",
      },
      {
        lang: "en",
        value: "my.portfolio",
      },
    ],

    addres: "russo-creation.github.io/my.portfolio",
    qr: qrMyPortfolio,
    image: imageMyportolio,
    technology: [
      "react + redux",
      "three.js",
      "sass",
      "html",
      "blender",
      "substance",
      "photoshop",
    ],
    description: [
      {
        lang: "en",
        value:
          "website fully created and designed by my own. Main assumption was to present 3D scene possibilities using real time engine with three.js library presented in web browser.",
      },
      {
        lang: "pl",
        value:
          "strona wykonana i zaprojektowana w całości przeze mnie. Głównym założeniem było przedstawienie możliwości sceny 3D przy użyciu silnika czasu rzeczywistego korzystając z biblioteki three.js prezentowanej w przeglądarce internetowej.",
      },
    ],
    intresting: ["github.com/Russo-creation/my.portfolio"],
  },
  //////////////////////-------------------------simple viewer
  {
    tittle: [
      {
        lang: "pl",
        value: "simple hd 3d viewer",
      },
      {
        lang: "en",
        value: "simple hd 3d viewer",
      },
    ],

    addres: "russo-creation.github.io/simple_hd_viewer",
    qr: qrSimpleHdViewer,
    image: imageSimpleHdViewer,
    technology: [
      "react",
      "three.js",
      "three fiber",
      "sass",
      "html",
      "blender",
      "substance",
      "photoshop",
    ],
    description: [
      {
        lang: "en",
        value:
          "Simple 3D scene inspired by 'The last of us' game prepared to check React three fiber possibilities",
      },
      {
        lang: "pl",
        value:
          "Prosta przeglądarkowe scena 3D inspirowana grą „The last od us” stworzona, aby móc przetestować możliwości biblioteki React three fiber",
      },
    ],
    intresting: ["github.com/Russo-creation/simple_hd_viewer"],
  },
  //////////////////////-------------------------3d scanned face
  {
    tittle: [
      {
        lang: "pl",
        value: "3d eyewear fitting",
      },
      {
        lang: "en",
        value: "3d eyewear fitting",
      },
    ],

    addres: "www.invidiaeyewear.com/3d_scans",
    qr: qr3d_scans,
    image: image3d_scans,
    technology: [
      "jquery",
      "javascript",
      "three.js",
      "css3",
      "html",
      "blender",
      "photoshop",
    ],
    description: [
      {
        lang: "en",
        value:
          "Prototype of an application for eyewear fitting using 3D face scans created for my own needs.",
      },
      {
        lang: "pl",
        value:
          "Prototyp projektu używania skanów 3d twarzy do dopasowywania okularów stworzony na własne potrzeby.",
      },
    ],
    intresting: [],
  },
  //////////////////////-------------------------Invidia
  {
    tittle: [
      {
        lang: "pl",
        value: "Invidiaeywear",
      },
      {
        lang: "en",
        value: "Invidiaeywear",
      },
    ],

    addres: "www.invidiaeyewear.com",
    qr: qrInvidia,
    image: imageInvidia,
    technology: [
      "jquery",
      "javascript",
      "three.js",
      "php",
      "mysql",
      "css3",
      "html",
      "blender",
      "photoshop",
    ],
    description: [
      {
        lang: "en",
        value:
          "Website (in use) with online store created and designed fully by myself for my own needs to present my 3d printed products (eyewear). Website contains  base information, product gallery, virtual 3d fitting room and full CMS.",
      },
      {
        lang: "pl",
        value:
          "Portal internetowy (w użyciu) wraz ze sklepem internetowym stworzony i zaprojektowany w całości przeze mnie na własne potrzeby prezentujący moje produkty wykonane w technologii druku 3d (okulary). Strona zawiera podstawowe informacje o produkcie, galerię produktów, wirtualną przymierzalnię 3d oraz pełny CMS.",
      },
    ],
    intresting: [
      "www.invidiaeyewear.com/3d_fitting_room.php",
      "www.invidiaeyewear.com/cyberpunk_steampunk.php",
    ],
  },
  
  //////////////////////-------------------------detall sell site
  {
    tittle: [
      {
        lang: "pl",
        value: "complex eyewear shop",
      },
      {
        lang: "en",
        value: "complex eyewear shop",
      },
    ],

    addres: "www.invidiaeyewear.com/detalsellsite",
    qr: qrDetalsellsite,
    image: imageDetalsellsite,
    technology: [
      "jquery",
      "javascript",
      "css3",
      "html",
      "php",
      "mysql",
      "photoshop",
    ],
    description: [
      {
        lang: "en",
        value:
          "complex eyewear online shop created for my own needs (not in use yet)",
      },
      {
        lang: "pl",
        value:
          "kompleksowy sklep internetowy z okularami stworzony na własne potrzeby (jeszcze nie w użyciu)",
      },
    ],
    intresting: [],
  },
  //////////////////////-------------------------impress
  {
    tittle: [
      {
        lang: "pl",
        value: "Dokumentacja optometryczna",
      },
      {
        lang: "en",
        value: "OPTOMETRIST DOCUMENTATION",
      },
    ],

    addres: "www.invidiaeyewear.com/impress",
    qr: qrImpress,
    image: imageImpress,
    technology: ["jquery", "javascript", "css3", "html", "php", "mysql"],
    description: [
      {
        lang: "en",
        value:
          "Freelance project created for couple customers (used by optometrists) to keep examine data. Use mail: demo and pass: demo to see demo version.",
      },
      {
        lang: "pl",
        value:
          "Projekt stworzony dla kilku klientów (dla optometrystów) do przechowywania danych z przeprowadzonych badań. Skorzystaj z mail: demo i hasło: demo, aby zalogować się do wersji demonstracyjnej.",
      },
    ],
    intresting: [],
  },
  //////////////////////-------------------------neooptica
  {
    tittle: [
      {
        lang: "pl",
        value: "landing page",
      },
      {
        lang: "en",
        value: "landing page",
      },
    ],

    addres: "neooptica.pl",
    qr: qrNeooptica,
    image: imageNeooptica,
    technology: ["jquery", "javascript", "css3", "html", "php", "mysql"],
    description: [
      {
        lang: "en",
        value: "Freelance project of simple landing page with simple cms.",
      },
      {
        lang: "pl",
        value:
          "Freelancerski projekt prostej strony internetowej z prostym cms.",
      },
    ],
    intresting: [],
  },
  //////////////////////-------------------------Arduino
  {
    tittle: [
      {
        lang: "pl",
        value: "arduino bms sensor",
      },
      {
        lang: "en",
        value: "arduino bms sensor",
      },
    ],

    addres: "www.youtube.com/watch?v=Q23D9dMsx2M",
    qr: qrBms,
    image: imageBms,
    technology: [
      "javascript",
      "css3",
      "html",
      "arduino due",
      "arduino Pro mini",
      "gsm (sms)",
      "display 2,8'",
    ],
    description: [
      {
        lang: "en",
        value: "BMS system created using Arduino modules",
      },
      {
        lang: "pl",
        value: "System centrali BMS stworzony przy użyciu układów Arduino",
      },
    ],
    intresting: [],
  },
  //////////////////////-------------------------github
  {
    tittle: [
      {
        lang: "pl",
        value: "github projects",
      },
      {
        lang: "en",
        value: "github projects",
      },
    ],

    addres: "github.com/Russo-creation",
    qr: qrGithub,
    image: imageGithub,
    technology: [],
    description: [
      {
        lang: "pl",
        value: null,
      },
      {
        lang: "en",
        value: null,
      },
    ],
    intresting: [],
  },
  //////////////////////-------------------------artstation
  {
    tittle: [
      {
        lang: "pl",
        value: "artstation profile",
      },
      {
        lang: "en",
        value: "artstation profile",
      },
    ],

    addres: "russo-creation.artstation.com",
    qr: qrArtstation,
    image: imageArtstation,
    technology: [],
    description: [
      {
        lang: "en",
        value: null,
      },
      {
        lang: "pl",
        value: null,
      },
    ],
    intresting: [],
  },
];

export default ProjectList;
