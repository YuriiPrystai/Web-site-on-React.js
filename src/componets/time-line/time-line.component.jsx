import React from 'react';

import styles from './time-line.module.scss';

const TimeLine = () => (
  <svg width="80%" stroke="#E12944" fill="#E12944" strokeWidth="10" className={styles.time_line} viewBox="0, 0, 1500, 600">
    <path d="M100 320 Q 300 235 450 300" fill="transparent" strokeDasharray="17,3,5,3" stroke="#FFDE2A" />
    <path d="M450 300 Q 600 365 750 300" fill="transparent" strokeDasharray="17,3,5,3" stroke="#FFDE2A" />
    <path d="M750 300 Q 900 235 1050 300" fill="transparent" strokeDasharray="17,3,5,3" stroke="#FFDE2A" />
    <path d="M1050 300 Q 1200 365 1400 282" fill="transparent" strokeDasharray="17,3,5,3" stroke="#FFDE2A" />

    <circle r="0" cx="100" cy="320" fill="#E12944" stroke="none">
      <animate attributeName="r" begin="0" dur="0.5s" values="0;16" fill="freeze" repeatCount="1" />
      <animateMotion
        dur="4.5s"
        begin="0.58s"
        values="1360"
        fill="freeze"
        path="M0,0 0 0 Q 200 -85 350 -20
                              M350 -20 Q 500 45 650 -20
                              M650 -20 Q 800 -85 950 -20
                              M950 -20 Q 1100 35 1250 -20"
      />
    </circle>

    <circle cx="150" cy="300" r="16" strokeWidth="0" />
    <circle cx="150" cy="300" r="0" fill="#FFDE2A" strokeWidth="0">
      <animate attributeName="r" begin="0.7s" dur="0.7s" values="0;9" fill="freeze" repeatCount="1" />
    </circle>
    <circle cx="450" cy="300" r="16" strokeWidth="0" />
    <circle cx="450" cy="300" r="0" fill="#FFDE2A" strokeWidth="0">
      <animate attributeName="r" begin="1.8s" dur="0.7s" values="0;9" fill="freeze" repeatCount="1" />
    </circle>
    <circle cx="750" cy="300" r="16" strokeWidth="0" />
    <circle cx="750" cy="300" r="0" fill="#FFDE2A" strokeWidth="0">
      <animate attributeName="r" begin="2.9s" dur="0.7s" values="0;9" fill="freeze" repeatCount="1" />
    </circle>
    <circle cx="1050" cy="300" r="16" strokeWidth="0" />
    <circle cx="1050" cy="300" r="0" fill="#FFDE2A" strokeWidth="0">
      <animate attributeName="r" begin="4.0s" dur="0.7s" values="0;9" fill="freeze" repeatCount="1" />
    </circle>
    <circle cx="1350" cy="300" r="16" strokeWidth="0" />
    <circle cx="1350" cy="300" r="0" fill="#FFDE2A" strokeWidth="0">
      <animate attributeName="r" begin="5.1s" dur="0.7s" values="0;9" fill="freeze" repeatCount="1" />
    </circle>
    

    <text x="20" y="110" strokeWidth="1" className={styles.time_line__text}>Створено</text>
    <text x="20" y="135" strokeWidth="1" className={styles.time_line__text}>ТОВ "М’ясник Прикарпаття"</text>
    <text x="70" y="455" strokeWidth="1" className={styles.time_line__dates}>30 березня 2012</text>

    <text x="390" y="480" strokeWidth="1" className={styles.time_line__text}>Вирощено</text>
    <text x="390" y="505" strokeWidth="1" className={styles.time_line__text}>першу власну птицю</text>
    <text x="395" y="165" strokeWidth="1" className={styles.time_line__dates}>Вересень 2017</text>

    <text x="660" y="110" strokeWidth="1" className={styles.time_line__text}>Збудовано</text>
    <text x="660" y="135" strokeWidth="1" className={styles.time_line__text}>власний забійний цех</text>
    <text x="680" y="455" strokeWidth="1" className={styles.time_line__dates}>Червень 2018</text>

    <text x="960" y="480" strokeWidth="1" className={styles.time_line__text}>Введено в експлуатацію</text>
    <text x="960" y="505" strokeWidth="1" className={styles.time_line__text}>комбікормовий завод</text>
    <text x="1000" y="165" strokeWidth="1" className={styles.time_line__dates}>Серпень 2018</text>

    <text x="1250" y="110" strokeWidth="1" className={styles.time_line__text}>Сертифіковано</text>
    <text x="1250" y="135" strokeWidth="1" className={styles.time_line__text}>у системі HACCP</text>
    <text x="1270" y="455" strokeWidth="1" className={styles.time_line__dates}>Вересень 2018</text>

    <path d="M150 300 Q 100 255 140 150" fill="transparent" strokeWidth="1" stroke="#E12944" />
    <path d="M150 300 Q 215 360 170 435" fill="transparent" strokeWidth="1" stroke="#E12944" />

    <path d="M450 300 Q 490 270 470 180" fill="transparent" strokeWidth="1" stroke="#E12944" />
    <path d="M450 300 Q 410 330 460 455" fill="transparent" strokeWidth="1" stroke="#E12944" />

    <path d="M750 300 Q 700 255 740 150" fill="transparent" strokeWidth="1" stroke="#E12944" />
    <path d="M750 300 Q 815 360 770 435" fill="transparent" strokeWidth="1" stroke="#E12944" />

    <path d="M1050 300 Q 1090 270 1070 180" fill="transparent" strokeWidth="1" stroke="#E12944" />
    <path d="M1050 300 Q 1010 330 1060 455" fill="transparent" strokeWidth="1" stroke="#E12944" />

    <path d="M1350 300 Q 1300 255 1340 150" fill="transparent" strokeWidth="1" stroke="#E12944" />
    <path d="M1350 300 Q 1415 360 1370 435" fill="transparent" strokeWidth="1" stroke="#E12944" />
  </svg>
);

export default TimeLine;
