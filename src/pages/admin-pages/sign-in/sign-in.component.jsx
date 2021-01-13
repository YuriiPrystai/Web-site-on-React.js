/* eslint-disable no-restricted-globals */
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { signIn } from '../../../api';
import Input from '../../../componets/input/input.component';

import styles from './sign-in.module.scss';

const SignIn = (prop) => (
  <div className={styles.form}>
    <h1 className={styles.form__header}>Цей вміст захищенно!</h1>
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}

      onSubmit={ async ({ login, password }) => {
        const response = await signIn({ login, password });

        if (response.status === 200) {
          localStorage.setItem('auth', response.data.token);

          prop.location.state ?
            prop.history.push(prop.location.state.from.pathname) :
            prop.history.push('/add-product');
        } else {
          prop.history.push('/');
        }
      }}

      validationSchema={Yup.object().shape({
        login: Yup.string()
          .required(),
        password: Yup.string()
          .required(),
      })}
    >
      {(props) => {
        const {
          values,
          errors,
          handleSubmit,
        } = props;

        const isValid = errors.login === undefined
        || errors.password === undefined;

        const isChanged = values.login &&
        values.password &&
        true;

        return (
          <form onSubmit={handleSubmit}>
            <Input name="login" type="text" label="Введіть логін" />
            <Input name="password" type="password" label="Введіть пароль" />
            <button
              type="submit"
              disabled={!isValid || !isChanged}
              className={styles.form__button}
              style={!isValid || !isChanged
                ? { cursor: 'not-allowed', backgroundColor: 'gray' }
                : { cursor: 'pointer', backgroundColor: '#e35768' }}
            >
              Продовжити
            </button>
          </form>
        );
      }}
    </Formik>
  </div>
);

export default SignIn;
