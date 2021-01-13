import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import shortid from 'shortid';
import {Parallax} from 'react-parallax';

import { getProducts } from '../../api';
import NewLoader from '../../componets/loader/loader.component';

import TimeLine from '../../componets/time-line/time-line.component'
import { contacts } from '../../const';

import styles from './main-page.module.scss'

const Contact = ({ className, info }) => (
  <div className={className}>
    <div>
      <h1>{info.title}</h1>
      <p className={styles.wrapper__content__contacts__info__contact__item__representative}>{info.representative}</p>
      <p className={styles.wrapper__content__contacts__info__contact__item__contactNumber}><a href={info.contactLink}>{info.contactNumber}</a></p>
    </div>
  </div>
)

const Block = ({info, className}) => (
  <div className={className}>
    <div className={styles.wrapper__content__products__blocks__block__content}>
      <div className={styles.wrapper__content__products__blocks__block__content__block_image}>
        <Link to={`/product/${info.productId}`} className={styles.wrapper__content__products__blocks__block__content__block_image__link_image}>
          <img src={info.images[0]} alt="#"/>
        </Link>
      </div>
      <Link to={`/product/${info.productId}`}>
        {info.name}
      </Link>
    </div>
    <div className={styles.wrapper__content__products__blocks__block__button}>
      <Link to={`/product/${info.productId}`} className={styles.wrapper__content__products__blocks__block__button__link}>
        Детальніше
      </Link>
    </div>
  </div>
);

const MainPage = () => {
  const [productsInfo, setProductsInfo] = useState();

  useEffect(() => {
    getProducts(6).then(data => {
      setProductsInfo(data);
    });
  },[])

  return(
    <div className={styles.wrapper}>
      <Parallax 
        bgImage={require('../../assets/carpathians.jpg')} 
        strength={300} 
      >
        <div className={styles.wrapper__header}>
          <img src={require('../../assets/header_logo.png')} alt="header logo"/>
        </div>
      </Parallax>
      <div className={styles.wrapper__content}>
        <div className={styles.wrapper__content__about_us} id="about">
          <h1>НАША ІСТОРІЯ</h1>
          <div className={styles.wrapper__content__about_us__blocks}>
            <div className={styles.wrapper__content__about_us__blocks__block}>
              <img src={require('../../assets/create_farm.png')} alt='TURKEY'/>
              <p>
                <span className={styles.wrapper__content__about_us__blocks__block__date}>30 березня 2012</span><br></br>
                <span>Створено<br></br> ТОВ "М’ясник Прикарпаття"</span>
              </p>
              <img src={require('../../assets/create_farm.png')} alt='TURKEY'/>
            </div>
            <div className={styles.wrapper__content__about_us__blocks__block}>
            <img src={require('../../assets/combicorm.png')} alt='turkey'/>
              <p>
              <span className={styles.wrapper__content__info__blocks__additional_block__block__date}>Червень 2013</span><br></br>
                  <span>Введено в експлуатацію<br></br> комбікормовий завод</span>
              </p>
              <img src={require('../../assets/combicorm.png')} alt='turkey'/>
            </div>
            <div className={styles.wrapper__content__about_us__blocks__block}>
              <img src={require('../../assets/Small_turkey.png')} alt='turkey'/>
              <p>
                <span className={styles.wrapper__content__about_us__blocks__block__date}>Вересень 2017</span><br></br>
                <span>Вирощено<br></br> першу власну птицю</span>
              </p>
              <img src={require('../../assets/turkey_icon.png')} alt='turkey'/>
            </div>
            <div className={styles.wrapper__content__about_us__blocks__block}>
              <img src={require('../../assets/build.png')} alt='build'/>
              <p>
                <span className={styles.wrapper__content__about_us__blocks__block__date}>Червень 2018</span><br></br>
                <span>Збудовано<br></br> власний забійний цех</span>
              </p>
              <img src={require('../../assets/builded.png')} alt='build'/>
            </div>
            <div className={styles.wrapper__content__about_us__blocks__block}>
              <img src={require('../../assets/HACCP.png')} alt='HACCP'/>
              <p>
                <span className={styles.wrapper__content__about_us__blocks__block__date}>Вересень 2018</span><br></br>
                <span>Сертифіковано<br></br> у системі HACCP</span>
              </p>
              <img src={require('../../assets/HACCP.png')} alt='HACCP'/>
            </div>
          </div>
          <TimeLine/>
          <div className={styles.wrapper__content__about_us__button}>
            <Link to="/about-us" className={styles.wrapper__content__about_us__button__link}>Детальніше</Link>
          </div>
        </div>
        <div className={styles.wrapper__content__certificate}>
          <img src={require('../../assets/haccp_logo.png')} alt='build'/>
          <p>
            Ми сертифіковані у системі HACCP, яка є науково обґрунтованою та дозволяє гарантувати виробництво безпечної продукції шляхом ідентифікації й контролю небезпечних чинників.
          </p>
        </div>

        <div className={styles.wrapper__content__products}>
          {    
            !productsInfo ?
            <NewLoader /> : 
            <div className={styles.wrapper__content__products__blocks}>
              {
                productsInfo.map((product) => <Block key={shortid()} info={product} className={styles.wrapper__content__products__blocks__block}/>)
              }
            </div>
          }
          <div className={styles.wrapper__content__products__button}>
            <Link to="/products" className={styles.wrapper__content__products__button__link}>Каталог продукції</Link>
          </div>
        </div>

        <div className={styles.wrapper__content__contacts}>
          <div className={styles.wrapper__content__contacts__info}>
            <div className={styles.wrapper__content__contacts__info__contact}>
              {
                contacts.map((contact) => <Contact key={shortid()} className={styles.wrapper__content__contacts__info__contact__item} info={contact} />)
              }
            </div>
            <div className={styles.wrapper__content__contacts__info__location}>
              <p>
                Україна <br/>
                Івано-Франківська область <br/>
                місто Надвірна <br/> 
                вул. Соборна 165<br/> 
                Офіс 2
              </p>
              <p>
                <strong>a/c: </strong>
                а/с 20
              </p>
              <p>
                <strong>Телефон: </strong>
                <a href="tel:+380977356772">+380977356772</a>
              </p>
              <p>
                <strong>Поштовий індекс: </strong>
                78405
              </p>
              <p>
                <strong>Електронна адреса: </strong>
                <a href="mailto:mp_5@i.ua">mp_5@i.ua</a>
              </p>
            </div>
          </div>
          <div className={styles.wrapper__content__contacts__button}>
            <Link to="/contacts" className={styles.wrapper__content__contacts__button__link}>Детальніше</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MainPage