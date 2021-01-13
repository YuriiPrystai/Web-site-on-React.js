import shortid from 'shortid';
import { Link } from 'react-router-dom';
import React, { useState, useEffect} from 'react';

import { getProducts } from '../../api';
import NewLoader from '../../componets/loader/loader.component';
import DownloadIcon from '../../componets/download-from-site/download.component';

import styles from './products.module.scss'

const Block = ({info, className}) => (
  <div className={className}>
    <div className={styles.container__blocks__block__content}>
      <div className={styles.container__blocks__block__content__block_image}>
        <Link to={`/product/${info.productId}`} className={styles.container__blocks__block__content__block_image__link_image}>
          <img src={info.images.find(image => image.split('/').reverse()[0].split('_')[0] === 'preview') || info.images[0]} alt="#"/>
        </Link>
        <Link to={`/product/${info.productId}`} className={styles.container__blocks__block__content__block_image__link_text}>
          <div className={styles.product_block_text} >
            <p>{info.description}</p>
          </div>
        </Link>
      </div>
      <Link to={`/product/${info.productId}`}>
        {info.name}
      </Link>
      <div className={styles.container__blocks__block__content__block_text}>
        <p>{info.description}</p>
      </div>
    </div>
    <div className={styles.container__blocks__block__button}>
      <Link to={`/product/${info.productId}`} className={styles.container__blocks__block__button__link}>
        Детальніше
      </Link>
    </div>
  </div>
);
  
const Products = () => {
  const [productsInfo, setProductsInfo] = useState();
  const [loader, setLoader] = useState()

  useEffect(() => {
    getProducts().then(data => {
      setProductsInfo(data);
    });
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <img src={require('../../assets/header_photo.jpg')} alt="Turkey"/>
        <div className={styles.container__header__text}>
          <p className={styles.container__header__text__paragpaph}>ПРОДУКЦІЯ</p>
          <p className={styles.container__header__text__paragpaph}>Основні види продукції: тушка, філе, стегно, гомілка, крило, окіст, субпродукти. Більше 14 найменувань продукції.</p>
        </div>
      </div>
      {    
        !productsInfo ?
        <NewLoader /> : 
        <div className={styles.container__blocks}>        
          {
            productsInfo.map((product) => <Block key={shortid()} info={product} className={styles.container__blocks__block}/>)
          }
        </div>
      }
      {
        loader ? <NewLoader /> : <DownloadIcon setLoader={setLoader}/> 
      }
    </div>
  )
};

export default Products;
