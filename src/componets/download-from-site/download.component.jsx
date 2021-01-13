import React from 'react';

import { createPdf } from '../../api/index';
import { saveAs } from 'file-saver';

import styles from './download.module.scss'

const DownloadIcon = (props) => {
  const savePDF = () => {
    props.setLoader(true)
    createPdf().then((response) => {
      if (response.status === 500){
        alert("Відсутній зв'язок із сервером, перевірте інтернет з'єднання");
        props.setLoader(false)
      } else {
        const pdfFile = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfFile, 'Turkey-Catalog.pdf');
        props.setLoader(false)
      }
    });
  }
  return(
    <div className={styles.container} onClick={savePDF}>
      <img src={require("../../assets/download-from-cloud.png")} alt="download" className={styles.container__icon}/>
      <span className={styles.container__link}>Завантажити<br/>каталог</span>
    </div>
  )
};

export default DownloadIcon