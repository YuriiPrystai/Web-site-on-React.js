/* eslint-disable no-restricted-globals */
import shortid from 'shortid';
import React, { useState, useEffect} from 'react';

import AdminPageTemplate from '../admin-page-template';
import { getProducts, deleteProduct, checkToken } from '../../../api';
import NotFound from '../../../componets/not-found/not-found.component';
import AdminNav from '../../../componets/admin-nav/admin-nav.component';

import styles from './delete-product.module.scss';

const DeleleProduct = (prop) => {
  const [productsList, setProductsList] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);

  useEffect(() => {
    async function sendToken () {
      const token = localStorage.getItem('auth');
      try {
        const response = await checkToken(token)
        if (response.status !== 200) {
          prop.history.push('/')
        }

        setLoaderStatus(false)
      } catch(err) {
        prop.history.push('/')
      }

      getProducts('all', ['productId','name']).then(data => {
        setProductsList(data);
      });
    }

    sendToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const deleteListItem = (id) => {
    const newItems = productsList.filter(product => product.productId !== id);
    deleteProduct(id);
    setProductsList(newItems);
  }

  const DeleteListItem = (props) => (
    <li>
      <span>{props.name}</span>
      <span onClick={() => deleteListItem(props.id)}>✕</span>
    </li>
  )

  const content = (
    <div>
      <AdminNav />
      <div className={styles.form}>
        <h1 className={styles.form__header}>Видалення продуктів</h1>
        <ul>
          {productsList.map(product => <DeleteListItem key={shortid()} name={product.name} id={product.productId}/>)}
        </ul>
      </div>
    </div>
  );

  return (
    <AdminPageTemplate>
      { productsList.length && !loaderStatus ? content : <NotFound />}
    </AdminPageTemplate>
  );
};

export default DeleleProduct;
