import React from 'react';
import { useField } from 'formik';
import styles from './input.module.scss';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={props.type === 'checkbox' ? styles.input__radioInput : styles.input}>
      <label>
        <span
          className={props.type === 'checkbox' ? styles.input__radioLabel : styles.input__label}
          style={
            field.value
              ? { visibility: 'visible', animationDelay: '30' }
              : { visibility: 'hidden', animationDelay: '30' }
          }
        >
          {label}
        </span>
        <input
          className={props.type === 'checkbox' ? styles.input__radioField : styles.input__field}
          placeholder={label}
          {...field}
          {...props}
          style={
            meta.error && meta.value
              ? {
                borderColor: 'red',
                boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075),\n    0 0 0 2px rgba(255, 0, 0, 0.1)',
                outline: 'none',
              }
              : { borderColor: meta.touched ? '#999999' : '#ccc' }
          }
          
        />
      </label>
      {meta.error && meta.value && props.type !== 'checkbox' ? (
        <div className={styles.input__feedback}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
