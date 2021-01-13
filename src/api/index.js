import axios from 'axios';

import { config } from '../config';

const token = localStorage.getItem('auth');

const sendEmail = async (data) => {
  const response = await axios({
    baseURL: config.baseURL,
    method: 'POST',
    url: `/send-email`,
    data,
    headers: {
      token,
    }
  });
  return response;
}

const createPdf = async () => {
  const response = await axios({
    baseURL: config.baseURL,
    method: 'GET',
    url: `/pdf`,
    responseType: 'blob'
  });
  return response;
}

const getProducts = async (limit='all', attributes=[]) => {
  const response = await axios({
    baseURL: config.baseURL,
    method: 'GET',
    url: `/product`,
    params: {
      limit,
      attributes
    }
  });
  return response.data;
};

const getProduct = async (productId) => {
  if (productId) {
    const response = await axios({
      baseURL: config.baseURL,
      method: 'GET',
      url: `/product/${productId}`
    });

    return response.data;
  };
};

const saveProduct = async (data) => {
  const response = await axios({
    baseURL: config.baseURL,
    method: 'POST',
    url: `/product`,
    data,
    headers: {
      token,
    }
  });
  return response;
};

const deleteProduct = async (productId) => {
  if (productId) {
    await axios({
      baseURL: config.baseURL,
      method: 'DELETE',
      url: `/product/${productId}`,
      headers: {
        token,
      }
    });
  }
};


const signIn = async (data) => {
  const response = await axios({
    baseURL: config.baseURL,
    method: 'POST',
    url: '/sign-in',
    data,
  });

  return response;
}

const checkToken = async (token) => {
  const response = await axios({
    baseURL: config.baseURL,
    method: 'GET',
    url: '/sign-in',
    params: {
      token
    }
  });

  return response;
}

export {
  signIn,
  sendEmail,
  createPdf,
  checkToken,
  getProduct,
  getProducts,
  saveProduct,
  deleteProduct,
};
