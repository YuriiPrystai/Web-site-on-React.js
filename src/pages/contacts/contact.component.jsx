import * as Yup from 'yup';
import React from 'react';
import shortid from 'shortid';
import {Formik, Form, } from 'formik';

import {
  withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow, 
} from 'react-google-maps';

import { locations, mapCenter, contacts } from '../../const';
import { sendEmail } from '../../api/index';

import styles from './contact.module.scss';

const Contact = ({ className, info }) => (
  <div className={className}>
    <div>
      <h1>{info.title}</h1>
      <p className={styles.contact__content__blocks__block__representative}>{info.representative}</p>
      <p className={styles.contact__content__blocks__block__contactNumber}><a href={info.contactLink}>{info.contactNumber}</a></p>
    </div>
  </div>
);

const ContactUsForm = () => {
  
  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        message: '' 
      }}
      validateOnBlur
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Обов\'язкове поле'),
        phone: Yup.string().matches(/^((\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)([\- ]?)\d{3}([\- ]?)([\- ]?)\d{2}([\- ]?)([\- ]?)\d{2}$/, 'Невірний формат').required('Обов\'язкове поле'),
        email: Yup.string().email('Введіть правильну пошту').required('Обов\'язкове поле'),
        message: Yup.string().typeError('Невірний тип поля').required('Обов\'язкове поле')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        //window.scrollTo(0, 0);
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (day < 10) {
          day = '0' + day;
        };
        if (month < 10) {
          month = '0' + month;
        };
        if (minutes < 10) {
          minutes = '0' + minutes;
        };
        for (var value in values){
          values[value] = values[value].trim();
        }
        const dateRequest = year + '.' + month + '.' + day + ' час ' + hours + ':' + minutes;
        values.date = dateRequest;        
        sendEmail(values).then(response => {
          const { status } = response;
          if (status === 200) {
            alert('Повідомлення відправлено!');
          } else if (status === 500){
            alert("Сервіс тимчасово недоступний, спробуйте згодом");
          } else {
            alert("Виникла помилка, спробуйте ще раз");
          }
        });
        setSubmitting(false);
        resetForm({
          values: {
            name: '',
            phone: '',
            email: '',
            message: ''
          },
        });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting }) => (
        <Form autoComplete="off">
          <div className={styles.contact__form}>
            <h1>НАПИШІТЬ НАМ</h1>
            <div className={styles.contact__form__fields}>
              <div className={styles.contact__form__fields__field}>
                <label htmlFor="name">Ім'я</label>
                <input 
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Введіть ваше ім'я"
                />
                {touched.name && errors.name && <p className={styles.contact__form__fields__field__error}>{errors.name}</p> }
              </div>
              <div className={styles.contact__form__fields__field}>
                <label htmlFor="phone">Телефон</label>
                <input 
                  id="input_phone"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  placeholder="Введіть ваш телефон"
                />
                {touched.phone && errors.phone && <p className={styles.contact__form__fields__field__error}>{errors.phone}</p> }
              </div>
              <div className={styles.contact__form__fields__field}>
                <label htmlFor="email">Пошта</label>
                <input 
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Введіть вашу пошту"
                />
                {touched.email && errors.email && <p className={styles.contact__form__fields__field__error}>{errors.email}</p> }
              </div>
              <div className={styles.contact__form__fields__field}>
                <label htmlFor="message">Ваше повідомлення</label>
                <textarea 
                  type="text"
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  placeholder="Введіть ваше повідомлення"
                  rows="4"
                  cols="50"
                />
                {touched.message && errors.message && <p className={styles.contact__form__fields__field__error}>{errors.message}</p> }
              </div>
            </div>
            <div className={styles.contact__form__container}>
              <button 
              className={styles.learn_more}
              type="submit" 
              //disabled={!isValid}
              onClick={handleSubmit}
              >
                <span className={styles.circle} aria-hidden="true">
                  <span className={styles.icon}></span>
                </span>
                <span className={styles.button_text}>Відправити</span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

function Map() {
  const isopen = true;
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
    >
      {
        locations.map((item) => (
          <Marker
            key={item.name} 
            position={item.location}
          >
            <InfoWindow>
                <div className={styles.location__map__info_window}>
                  {item.popupsString}
                </div>
            </InfoWindow>
          </Marker>
        ))
      },
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Location = () => (
  <div className={styles.location}>
    <div className={styles.location__map}>
      <div style={{ width: '100%', height: '100%' }}>
        <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDr8E6wLVCb0m4hAt_yNksAluy7fEhkcpI"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
    <div className={styles.location__button}>
      <a className={styles.location__button__link} href="https://www.google.com/maps/dir//48.782029149022925, 24.512743136367387" target="_blank">Побудувати маршрут</a>
    </div>
    <div className={styles.location__coordinates}>
      <div className={styles.location__coordinates__item}>
        <h2>М'ясо-переробний цех</h2>
        <p>Україна, Івано-Франківська область, c. Підгір'я, вул. Фермерська 37</p>
        <p>
          <strong>Телефон: </strong>
          <a href="tel:+380977356772">+380977356772</a>
        </p>
        <p>
          <strong>a/c: </strong>
          а/с 20
        </p>
        <p>
          <strong>Поштовий індекс: </strong>
          77706
        </p>
        <p>
          <strong>Електронна адреса: </strong>
          <a href="mailto:mp_5@i.ua">mp_5@i.ua</a>
        </p>
      </div>
      <div className={styles.location__coordinates__item}>
        <h2>Офісне приміщення</h2>
        <p>Україна, Івано-Франківська область, м. Надвірна, вул. Соборна 165, Офіс 2</p>
        <p>
          <strong>Телефон: </strong>
          <a href="tel:+380977356772">+380977356772</a>
        </p>
        <p>
          <strong>a/c: </strong>
          а/с 20
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
  </div>
);

const ContactList = () => (
  <div className={styles.contact}>
    <h1 className={styles.contact__header}>КОНТАКТИ</h1>
    <div className={styles.contact__content}>
      <div className={styles.contact__content__blocks}>
        {
          contacts.map((contact) => <Contact key={shortid()} className={styles.contact__content__blocks__block} info={contact} />)
        }
      </div>
    </div>
    <Location />
    <ContactUsForm />
  </div>
);

export default ContactList;
