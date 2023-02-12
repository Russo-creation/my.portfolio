import React from 'react';
import { FaGithub, FaReact } from 'react-icons/fa';

import { DiJavascript1, DiPhp, DiNodejsSmall } from 'react-icons/di';

import Awwwards from '../../../../../../icon/awwwards';
import Cssda from '../../../../../../icon/cssda';
import CSSWinner from '../../../../../../icon/cssWinner';
import WebGuru from '../../../../../../icon/webGuru';

import CertyficateRow from './certificateComponents/CertificateRow';

import html_13_01_2020 from '../../../../../../documents/javascript sass html jquery.pdf';
import github_20_01_2020 from '../../../../../../documents/github.pdf';
import react_21_01_2020 from '../../../../../../documents/react od podstaw.pdf';
import react_26_01_2020 from '../../../../../../documents/react complete guide.pdf';
import phpCMS_30_01_2020 from '../../../../../../documents/php CMS.pdf';
import phpOOP_02_02_2020 from '../../../../../../documents/php OOP.pdf';
import nodejs_14_02_2020 from '../../../../../../documents/node mongodb.pdf';
import php74_06_08_2020 from '../../../../../../documents/php 74.pdf';
import react_19_08_2020 from '../../../../../../documents/react midd.pdf';
import react_native_03_10_2020 from '../../../../../../documents/react native complete guide.pdf';
import awwwards_my_portfolio_16_03_2021 from '../../../../../../documents/certificate-lukasz-macon-my-portfolio-hm.pdf';
import cssStar_my_portfolio_25_11_2021 from '../../../../../../documents/CSSW-15805-Star-Certificate__my_portfolio_25-11-2021.pdf';
import Guru_Of_The_Day_my_portfolio_30_11_2021 from '../../../../../../documents/Certificate for Guru Of The Day_my_portfolio_30-11-2021.pdf';
import cssda_ui_my_portfolio_08_12_2021 from '../../../../../../documents/cssda-ui-Lukasz-Macon_08_12_2021.pdf';
import cssda_ux_Lukasz_Macon_08_12_2021 from '../../../../../../documents/cssda-ux-Lukasz-Macon_08_12_2021.pdf';
import cssda_innovation_Lukasz_Macon_08_12_2021 from '../../../../../../documents/cssda-innovation-Lukasz-Macon_08_12_2021.pdf';
import cssda_wotd_my_portfolio_08_12_2021 from '../../../../../../documents/cssda-wotd_my_portfolio_08_12_2021.pdf';
import cssda_ui_4_Seasons_Slot_Machine_25_07_2022 from '../../../../../../documents/cssda-ui-4-Seasons-Slot-Machine_25_07_2022.pdf';
import cssda_ux_4_Seasons_Slot_Machine_25_07_2022 from '../../../../../../documents/cssda-ux-4-Seasons-Slot-Machine_25_07_2022.pdf';
import cssda_innovation_4_Seasons_Slot_Machine_25_07_2022 from '../../../../../../documents/cssda-innovation-4-Seasons-Slot-Machine_25_07_2022.pdf';
import awwwards_4_seasons_slot_machine_hm_01_08_2022 from '../../../../../../documents/certificate-awwwards-4-seasons-slot-machine-hm_01-08-2022.pdf';

const certificateList = [
  {
    name: 'html js',
    date: '13.01.2020',
    certyficate: html_13_01_2020,
    icon: <DiJavascript1 />,
  },
  {
    name: 'github',
    date: '20.01.2020',
    certyficate: github_20_01_2020,
    icon: <FaGithub />,
  },
  {
    name: 'react',
    date: '21.01.2020',
    certyficate: react_21_01_2020,
    icon: <FaReact />,
  },
  {
    name: 'react',
    date: '26.01.2020',
    certyficate: react_26_01_2020,
    icon: <FaReact />,
  },
  {
    name: 'php',
    date: '30.01.2020',
    certyficate: phpCMS_30_01_2020,
    icon: <DiPhp />,
  },
  {
    name: 'php',
    date: '02.02.2020',
    certyficate: phpOOP_02_02_2020,
    icon: <DiPhp />,
  },
  {
    name: 'nodejs',
    date: '14.02.2020',
    certyficate: nodejs_14_02_2020,
    icon: <DiNodejsSmall />,
  },
  {
    name: 'php',
    date: '06.08.2020',
    certyficate: php74_06_08_2020,
    icon: <DiPhp />,
  },
  {
    name: 'react',
    date: '19.08.2020',
    certyficate: react_19_08_2020,
    icon: <FaReact />,
  },
  {
    name: 'react native',
    date: '03.10.2020',
    certyficate: react_native_03_10_2020,
    icon: <FaReact />,
  },

  {
    name: 'awwwards Honorable Mention',
    date: '16.03.2021',
    certyficate: awwwards_my_portfolio_16_03_2021,
    icon: <Awwwards />,
  },

  {
    name: 'CSSWINNER CSSW STAR',
    date: '25.11.2021',
    certyficate: cssStar_my_portfolio_25_11_2021,
    icon: <CSSWinner />,
  },
  {
    name: 'CSSWINNER CSSW STAR',
    date: '25.11.2021',
    certyficate: cssStar_my_portfolio_25_11_2021,
    icon: <CSSWinner />,
  },

  {
    name: 'WEB GURU AWARDS Guru Of The Day',
    date: '30.11.2021',
    certyficate: Guru_Of_The_Day_my_portfolio_30_11_2021,
    icon: <WebGuru />,
  },
  {
    name: 'CSSDA UI Design Award',
    date: '08.12.2021',
    certyficate: cssda_ui_my_portfolio_08_12_2021,
    icon: <Cssda />,
  },
  {
    name: 'CSSDA UX Design Award',
    date: '08.12.2021',
    certyficate: cssda_ux_Lukasz_Macon_08_12_2021,
    icon: <Cssda />,
  },
  {
    name: 'CSSDA Innovation Design Award',
    date: '08.12.2021',
    certyficate: cssda_innovation_Lukasz_Macon_08_12_2021,
    icon: <Cssda />,
  },

  {
    name: 'CSSDA Website Of The Day',
    date: '08.12.2021',
    certyficate: cssda_wotd_my_portfolio_08_12_2021,
    icon: <Cssda />,
  },

  {
    name: 'CSSDA UI Design Award',
    date: '25.07.2022',
    certyficate: cssda_ui_4_Seasons_Slot_Machine_25_07_2022,
    icon: <Cssda />,
  },

  {
    name: 'CSSDA UX Design Award',
    date: '25.07.2022',
    certyficate: cssda_ux_4_Seasons_Slot_Machine_25_07_2022,
    icon: <Cssda />,
  },

  {
    name: 'CSSDA Innovation Design Award',
    date: '25.07.2022',
    certyficate: cssda_innovation_4_Seasons_Slot_Machine_25_07_2022,
    icon: <Cssda />,
  },

  {
    name: 'awwwards Honorable Mention',
    date: '01.08.2022',
    certyficate: awwwards_4_seasons_slot_machine_hm_01_08_2022,
    icon: <Awwwards />,
  },
];

const Certificates = (props) => {
  let sortedDesc = certificateList.sort(
    (a, b) =>
      Date.parse(new Date(b.date.split('.').reverse().join('-'))) -
      Date.parse(new Date(a.date.split('.').reverse().join('-')))
  );

  const getCertificates = sortedDesc.map((item, index) => (
    <CertyficateRow
      key={'cert' + item.name + index}
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
