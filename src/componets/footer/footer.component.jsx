import React from 'react'
import { Link } from 'react-router-dom';

import styles from './footer.module.scss'

const Footer = () => (
  <footer className={styles.wrapper}>
    <div className={styles.wrapper__container}>
      <div className={styles.wrapper__container__blocks}>
        <nav className={styles.wrapper__container__blocks__block_content}>
          <ul className={styles.wrapper__container__blocks__block_content__menu}>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/contacts">Контакти</Link>
            </li>
            <li>
              <Link to="/products">Продукція</Link>
            </li>
            <li>
              <Link to="/about-us">Про нас</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.wrapper__container__blocks__block_logo}>
          <img src={require('../../assets/logo_circle.png')} alt="Logo"/>
          <div className={styles.wrapper__container__blocks__block_logo__text}>
            <p><img src={require('../../assets/phone.png')} alt="Phone"/><a href="tel:+380977356772">+380977356772</a></p>
            <p><img src={require('../../assets/mail.png')} alt="Mail"/><a href="mailto:mp_5@i.ua">mp_5@i.ua</a></p>
          </div>
        </div>
        <div className={styles.wrapper__container__blocks__block_content}>
          <p>Наша адреса</p>
          <p>Україна</p>
          <p>Івано-Франківська область</p>
          <p>Місто Надвірна</p>
          <p>вул. Соборна 165</p>
          <p>Офіс 2</p>
        </div>
      </div>
      <div className={styles.wrapper__container__copy}>
        <p>&copy; 2020 - {new Date().getFullYear()} SeloSoft</p>
      </div>
    </div>
  </footer>
);

export default Footer