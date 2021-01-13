import React from 'react';
import { Link } from 'react-router-dom';

import styles from './admin-nav.module.scss';

const AdminNav = () => (
  <nav className={styles.nav}>
    <ul className={styles.nav__list}>
      <Link to="/add-product">
        <li>Додати продукт</li>
      </Link>
      <Link to="/delete-product">
        <li>Видалити продукт</li>
      </Link>
    </ul>
  </nav>
);

export default AdminNav;
