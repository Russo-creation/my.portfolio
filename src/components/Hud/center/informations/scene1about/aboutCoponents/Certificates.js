import React from "react";
import { FaGithub, FaReact } from "react-icons/fa";

import { DiJavascript1, DiPhp, DiNodejsSmall } from "react-icons/di";

import CertyficateRow from "./certificateComponents/CertificateRow";

import html_13_01_2020 from "../../../../../../documents/javascript sass html jquery.pdf";
import github_20_01_2020 from "../../../../../../documents/github.pdf";
import react_21_01_2020 from "../../../../../../documents/react od podstaw.pdf";
import react_26_01_2020 from "../../../../../../documents/react complete guide.pdf";
import phpCMS_30_01_2020 from "../../../../../../documents/php CMS.pdf";
import phpOOP_02_02_2020 from "../../../../../../documents/php OOP.pdf";
import nodejs_14_02_2020 from "../../../../../../documents/node mongodb.pdf";
import php74_06_08_2020 from "../../../../../../documents/php 74.pdf";
import react_19_08_2020 from "../../../../../../documents/react midd.pdf";
import react_native_03_10_2020 from "../../../../../../documents/react native complete guide.pdf";

const certificateList = [
  {
    name: "html js",
    date: "13.01.2020",
    certyficate: html_13_01_2020,
    icon: <DiJavascript1 />,
  },
  {
    name: "github",
    date: "20.01.2020",
    certyficate: github_20_01_2020,
    icon: <FaGithub />,
  },
  {
    name: "react",
    date: "21.01.2020",
    certyficate: react_21_01_2020,
    icon: <FaReact />,
  },
  {
    name: "react",
    date: "26.01.2020",
    certyficate: react_26_01_2020,
    icon: <FaReact />,
  },
  {
    name: "php",
    date: "30.01.2020",
    certyficate: phpCMS_30_01_2020,
    icon: <DiPhp />,
  },
  {
    name: "php",
    date: "02.02.2020",
    certyficate: phpOOP_02_02_2020,
    icon: <DiPhp />,
  },
  {
    name: "nodejs",
    date: "14.02.2020",
    certyficate: nodejs_14_02_2020,
    icon: <DiNodejsSmall />,
  },
  {
    name: "php",
    date: "06.08.2020",
    certyficate: php74_06_08_2020,
    icon: <DiPhp />,
  },
  {
    name: "react",
    date: "19.08.2020",
    certyficate: react_19_08_2020,
    icon: <FaReact />,
  },
  {
    name: "react native",
    date: "03.10.2020",
    certyficate: react_native_03_10_2020,
    icon: <FaReact />,
  },


  
];

const Certificates = (props) => {
  let sortedDesc = certificateList.sort(
    (a, b) =>
      Date.parse(new Date(b.date.split(".").reverse().join("-"))) -
      Date.parse(new Date(a.date.split(".").reverse().join("-")))
  );

  const getCertificates = sortedDesc.map((item, index) => (
    <CertyficateRow
      key={"cert" + item.name + index}
      date={item.date}
      text={item.name}
      certyficate={item.certyficate}
      icon={item.icon}
      first={index === 0 ? true : false}
      last={index + 1 === certificateList.length ? true : false}
    />
  ));

  return <>{getCertificates}</>;
};

export default React.memo(Certificates);
