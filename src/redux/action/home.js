import {showMessage} from '../../utils';

const {default: Axios} = require('axios');
const {API_HOST} = require('../../config');

export const getSkincare = () => dispatch => {
  Axios.get(`${API_HOST.url}/product`)
    .then(res => {
      dispatch({type: 'SET_SKINCARE', value: res.data.data.data});
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Skincare API` ||
          'Terjadi kesalahan di API Skincare',
      );
    });
};

export const getSkincareDataByTypes = types => dispatch => {
  Axios.get(`${API_HOST.url}/product?types=${types}`)
    .then(res => {
      if (types === 'sunscreen') {
        dispatch({type: 'SET_SUNSCREEN', value: res.data.data.data});
      }
      if (types === 'serum') {
        dispatch({type: 'SET_SERUM', value: res.data.data.data});
      }
      if (types === 'facial_wash') {
        dispatch({type: 'SET_FACIAL_WASH', value: res.data.data.data});
      }
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Skincare By Type API` ||
          'Terjadi kesalahan di API Skincare By Type',
      );
    });
};
