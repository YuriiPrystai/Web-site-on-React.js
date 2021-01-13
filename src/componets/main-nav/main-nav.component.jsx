import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';

import styles from './main-nav.module.scss';

const MainMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickOnBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeBurgerMenu = () => {
    const widthWindow = document.documentElement.clientWidth;
    
    if (widthWindow <= 767) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const displayWindowSize = () => {
    const widthWindow = document.documentElement.clientWidth;

    if (widthWindow > 767) {
      setIsMenuOpen(false);
    }
  };

  window.addEventListener('resize', displayWindowSize);

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__container__body}>
            <div className={isMenuOpen ? styles.header__container__body__burger__active : styles.header__container__body__burger} onClick={clickOnBurger}>
              <span />
            </div>
            <nav className={isMenuOpen ? styles.header__container__body__nav__active : styles.header__container__body__nav}>
              <ul className={styles.header__container__body__nav__buttons}>
                <Link className={styles.header__container__body__nav__buttons__burger_logo} id="img" to="/" onClick={closeBurgerMenu}>
                  <img src={require('../../assets/logo_circle.png')} alt="Logo mobile" />
                </Link>
                <NavLink activeClassName={styles.selected__link} className={styles.header__container__body__nav__buttons__about} exact to="/" onClick={closeBurgerMenu}>
                  <li>Головна</li>
                </NavLink>
                <NavLink activeClassName={styles.selected__link} className={styles.header__container__body__nav__buttons__contacts} to="/contacts" onClick={closeBurgerMenu}>
                  <li>Контакти</li>
                </NavLink>
                <Link className={styles.header__container__body__nav__buttons__img} id="img" to="/">
                  <img src={require('../../assets/logo_circle.png')} alt="Logo" />
                </Link>
                <NavLink activeClassName={styles.selected__link} className={styles.header__container__body__nav__buttons__products} to="/products" onClick={closeBurgerMenu}>
                  <li>Продукція</li>
                </NavLink>
                <NavLink activeClassName={styles.selected__link} className={styles.header__container__body__nav__buttons__certificates} to="/about-us" onClick={closeBurgerMenu}>
                  <li>Про нас</li>
                </NavLink>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default MainMenu;
