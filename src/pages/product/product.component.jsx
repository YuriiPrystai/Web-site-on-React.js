/* eslint-disable no-restricted-globals */
import shortid from 'shortid';
import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { getProduct } from '../../api';
import NewLoader from '../../componets/loader/loader.component';
import TableRow from '../../componets/table-row/table-row.component';

import styles from './product.module.scss';

const Product = () => {
  const [productInfo, setProductInfo] = useState();

  let { productId } = useParams();

  useEffect(() => {
    getProduct(productId).then(data => {
      setProductInfo(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const NewCarouselElement = (props) => (
    <div>
      <img src={props.image} alt="productImage" />
    </div>
  );

  const AdvancedInfoTableRow = ({ category, values }) => (
    <div className={styles.product__content__advanced_info__table_row}>
      <div>
        <p>{category}</p>
      </div>
      <div className={styles.product__content__advanced_info__table_row__values}>
        <p>
          {values.chilled} {category === "Умови зберігання" ? '°C' : ''}
        </p>
        <p>
          {values.frozen} {category === "Умови зберігання" ? '°C' : ''}
        </p>
      </div>
    </div>
  );

  return (
  !productInfo ? 
    <NewLoader /> :
    <div className={styles.product}>
      <h1 className={styles.product__header}>{productInfo.name}</h1>
      <div className={styles.product__content}>
        <div className={styles.product__content__header}>
          <div className={styles.product__content__header__image}>
            <Carousel autoPlay infiniteLoop showThumbs={false} centerMode centerSlidePercentage={100.5}>
              { productInfo.images.map((image) => <NewCarouselElement key={shortid()} image={image} />)}
            </Carousel>
          </div>
          <div className={styles.product__content__header__components}>
            <p>Склад продукту на 100 грам</p>
            <table>
              <tbody>
                <TableRow info={{ name: 'Білки', value: `${productInfo.primaryInfo.protein} г.` }} />
                <TableRow info={{ name: 'Жири', value: `${productInfo.primaryInfo.fat} г.` }} />
                <TableRow info={{ name: 'Енергетична цінність', value: `${productInfo.primaryInfo.energy} ккал.` }} />
                <TableRow info={{ name: 'Термін зберігання', value: `${productInfo.primaryInfo.expirationDate} днів` }} />
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.description_styles}>
          <p>{productInfo.description}</p>
        </div>
        <div className={styles.product__content__advanced_info}>
          <AdvancedInfoTableRow key={shortid()} category="" values={{ chilled: 'Охолоджена', frozen: 'Заморожена' }} />
          <AdvancedInfoTableRow key={shortid()} category="Діапазон ваги" values={productInfo.advancedInfo.weight} />
          <AdvancedInfoTableRow key={shortid()} category="Первинна упаковка" values={productInfo.advancedInfo.packaging} />
          <AdvancedInfoTableRow key={shortid()} category="Сертифікація" values={productInfo.advancedInfo.certification} />
          <AdvancedInfoTableRow key={shortid()} category="Тип охолодження" values={productInfo.advancedInfo.typeOfCooling} />
          <AdvancedInfoTableRow key={shortid()} category="Умови зберігання" values={productInfo.advancedInfo.storageConditions} />
          <AdvancedInfoTableRow key={shortid()} category="Термін придатності" values={productInfo.advancedInfo.expirationDate} />
        </div>
        <div className={styles.product__content__button}>
          <Link to="/products" className={styles.product__content__button__link}>Назад до каталогу</Link>
        </div>
      </div>
    </div>
  );
};

export default Product; // to do get pathname from state for link
