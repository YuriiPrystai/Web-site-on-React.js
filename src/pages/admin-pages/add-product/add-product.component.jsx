/* eslint-disable no-restricted-globals */
import * as Yup from 'yup';
import shortid from 'shortid';
import { Formik, Field } from 'formik';
import Resizer from 'react-image-file-resizer';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { saveProduct, checkToken } from '../../../api';
import AdminPageTemplate from '../admin-page-template';
import Input from '../../../componets/input/input.component';
import NotFound from '../../../componets/not-found/not-found.component';
import AdminNav from '../../../componets/admin-nav/admin-nav.component';

import styles from './add-product.module.scss';

const AddProduct = (prop) => {
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
    }
    sendToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeImage = (id, fieldValue) => {
    const { images, setFieldValue } = fieldValue;
    const newImages = [...images.slice(0, id), ...images.slice(id + 1)];
    if (newImages.length) {
      newImages[0].preview = id === 0 ? true : newImages[0].preview;
    } else {
      document.getElementById('images').value = '';
    }

    setFieldValue('images', newImages);
  };

  const setImageAsPreview = (id, fieldValue) => {
    const { images, setFieldValue } = fieldValue;

    const tempImage = images[0].image;
    images[0].image = images[id].image;
    images[id].image = tempImage;

    setFieldValue('images', images);
  };

  const NewCarouselElement = (props) => (
    <div>
      <img src={props.image} alt="productImage" />
    </div>
  );

  const ImageIcon = ({ imageId, imageObj, fieldValue }) => (
    <div>
      <img src={imageObj.image} alt={imageId} />
      <span className={styles.delete_photo} onClick={() => removeImage(imageId, fieldValue)}>X</span>
      {imageObj.preview || <span onClick={() => setImageAsPreview(imageId, fieldValue)}>Зробити головною</span>}
    </div>
  );

  const uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    const images = e.target.files;

    if (images.length) {
      const finishedImages = [];
      for (const [key, value] of Object.entries(images)) {
        const reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result;

          image.onload = function () {
            const { height } = this;
            const { width } = this;

            let minHeigth = 0;
            let minWidth = 0;

            if (height > width) {
              minHeigth = 600;
              const coef = Math.floor(height / minHeigth);
              minWidth = width / coef;
            } else {
              minWidth = 600;
              const coef = Math.floor(width / minWidth);
              minHeigth = height / coef;
            }

            Resizer.imageFileResizer(
              value,
              minWidth,
              minHeigth,
              'png',
              100,
              0,
              (uri) => {
                if (!finishedImages.length) {
                  finishedImages.push({ preview: true, image: uri });
                } else {
                  finishedImages.push({ preview: false, image: uri });
                }

                if (key === JSON.stringify(images.length - 1)) {
                  setFieldValue('images', finishedImages);
                }
              },
            );
          };
        };
      }
    }
  };

  const content = (
    <div>
      <AdminNav />
      <div className={styles.form}>
        <h1 className={styles.form__header}>Заповніть інформацію про новий продукт</h1>
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            description: '',
            images: [],
            primaryInfo: {
              protein: '',
              fat: '',
              energy: '',
              expirationDate: '',
            },
            advancedInfo: {
              weight: {
                chilled: '',
                frozen: '',
              },
              
              packaging: {
                chilled: '',
                frozen: '',
              },
              certification: {
                chilled: '',
                frozen: '',
              },
              typeOfCooling: {
                chilled: '',
                frozen: '',
              },
              storageConditions: {
                chilled: '',
                frozen: '',
              },
              expirationDate: {
                chilled: '',
                frozen: '',
              },
            },
          }}

          onSubmit={(values) => {
            setLoaderStatus(true);
            window.scrollTo(0, 0);

            saveProduct(values).then(response => {
              setLoaderStatus(false);
              
              const { data, status } = response;
              
              if (status === 200) {
                alert('Успішно додано!');
              } else {
                alert(data);
              }
            });
          }}

          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required(),
            description: Yup.string()
              .required(),
            images: Yup.array()
              .required(),
            primaryInfo: Yup.object(
              {
                protein: Yup.number().required(),
                fat: Yup.number().required(),
                energy: Yup.number().required(),
                expirationDate: Yup.number().required(),
              },
            ),
            advancedInfo: Yup.object({
              weight: Yup.object({
                chilled: Yup.string()
                  .required(),
                frozen: Yup.string()
                  .required(),
              }),
              
              packaging: Yup.object({
                chilled: Yup.string()
                  .required(),
                frozen: Yup.string()
                  .required(),
              }),
              certification: Yup.object({
                chilled: Yup.string()
                  .required(),
                frozen: Yup.string()
                  .required(),
              }),
              typeOfCooling: Yup.object({
                chilled: Yup.string()
                  .required(),
                frozen: Yup.string()
                  .required(),
              }),
              storageConditions: Yup.object({
                chilled: Yup.string()
                  .required(),
                frozen: Yup.string()
                  .required(),
              }),
              expirationDate: Yup.object({
                chilled: Yup.string()
                  .required(),
                frozen: Yup.string()
                  .required(),
              }),
            }),
          })}
        >
          {(props) => {
            const {
              values,
              errors,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            } = props;

            const isValid = errors.name === undefined
            && errors.description === undefined
            && errors.images === undefined
            && errors.primaryInfo === undefined
            && errors.advancedInfo === undefined;

            const isChanged = values.name
            && values.description
            && values.images.length
            && values.primaryInfo
            && values.advancedInfo
            && true;

            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.product}>
                  <h1 className={styles.product__header}>
                    <Input name="name" type="text" label="Ім'я товару" />
                  </h1>
                  <div className={styles.product__content}>
                    <div className={styles.product__content__header}>
                      <div className={styles.product__content__header__image}>
                        {
                          !!values.images.length
                          && (
                          <Carousel autoPlay infiniteLoop showThumbs={false}>
                            { values.images.map((imageObj) => <NewCarouselElement key={shortid()} image={imageObj.image} />)}
                          </Carousel>
                          )
                        }
                        <input name="image" id="images" type="file" accept=".png, .jpg, .jpeg" multiple onChange={(e) => uploadImage(e, setFieldValue)} />
                        <div className={styles.product__content__header__image__icons}>
                          { values.images.map((imageObj, index) => <ImageIcon key={shortid()} imageId={index} imageObj={imageObj} fieldValue={{ setFieldValue, images: values.images }} />)}
                        </div>
                      </div>
                      <div className={styles.product__content__header__primary_info}>
                        <p>Склад продукту на 100 грам</p>
                        <div className={styles.product__content__header__primary_info__table}>
                          <ul>
                            <li>
                              <Input name="primaryInfo.protein" type="number" label="Білки" />
                              <span>г.</span>
                            </li>
                            <li>
                              <Input name="primaryInfo.fat" type="number" label="Жири" />
                              <span>г.</span>
                            </li>
                            <li>
                              <Input name="primaryInfo.energy" type="number" label="Енергетична ціність" />
                              <span>ккал.</span>
                            </li>
                            <li>
                              <Input name="primaryInfo.expirationDate" type="number" label="Термін зберігання" />
                              <span>днів</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Field component="textarea" name="description" rows="5" placeholder="Опис продукту" />
                    </div>
                    <div>
                      <table className={styles.product__content__advanced_info}>
                        <tbody>
                          <tr>
                            <th />
                            <th>Охолоджена</th>
                            <th>Заморожена</th>
                          </tr>
                          <tr>
                            <td>Діапазон ваги</td>
                            <td>
                              <Input name="advancedInfo.weight.chilled" type="string" />
                            </td>
                            <td>
                              <Input name="advancedInfo.weight.frozen" type="string" />
                            </td>
                          </tr>
                          <tr>
                            <td>Первинна упаковка</td>
                            <td>
                              <Input name="advancedInfo.packaging.chilled" type="string" />
                            </td>
                            <td>
                              <Input name="advancedInfo.packaging.frozen" type="string" />
                            </td>
                          </tr>
                          <tr>
                            <td>Сертифікація</td>
                            <td>
                              <Input name="advancedInfo.certification.chilled" type="string" />
                            </td>
                            <td>
                              <Input name="advancedInfo.certification.frozen" type="string" />
                            </td>
                          </tr>
                          <tr>
                            <td>Тип охолодження</td>
                            <td>
                              <Input name="advancedInfo.typeOfCooling.chilled" type="string" />
                            </td>
                            <td>
                              <Input name="advancedInfo.typeOfCooling.frozen" type="string" />
                            </td>
                          </tr>
                          <tr>
                            <td>Умови зберігання</td>
                            <td>
                              <Input name="advancedInfo.storageConditions.chilled" type="string" />
                            </td>
                            <td>
                              <Input name="advancedInfo.storageConditions.frozen" type="string" />
                            </td>
                          </tr>
                          <tr>
                            <td>Термін придатності</td>
                            <td>
                              <Input name="advancedInfo.expirationDate.chilled" type="string" />
                            </td>
                            <td>
                              <Input name="advancedInfo.expirationDate.frozen" type="string" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="submit"
                      // disabled={!isValid || isSubmitting || !isChanged}
                      className={styles.form__button}
                      style={!isValid || isSubmitting || !isChanged
                        ? { cursor: 'not-allowed', backgroundColor: 'gray' }
                        : { cursor: 'pointer', backgroundColor: '#e35768' }}
                    >
                      Додати
                    </button>

                  </div>
                </div>

              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );

  return (
    <AdminPageTemplate>
      {loaderStatus ? <NotFound /> : content}
    </AdminPageTemplate>
  );
};

export default AddProduct;
