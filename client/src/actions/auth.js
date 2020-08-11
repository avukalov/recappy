import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

// import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  // REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOGOUT,
} from './types';

import jwtDecode from 'jwt-decode';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await api.get('/user');

    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/user/register', formData);

    const { token } = res.data;
    const userData = jwtDecode(token);

    setAuthToken(token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: userData,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }

    // dispatch({
    //   type: REGISTER_FAIL,
    // });
  }
};

// Login User
export const login = (email, password, remember) => async (dispatch) => {
  const body = { email, password, remember };

  try {
    const { data } = await api.post('/user/login', body);

    const { token } = data;

    const userData = jwtDecode(token);

    setAuthToken(token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }

    // dispatch({
    //   type: LOGIN_FAIL,
    // });
  }
};

// Logout
export const logout = () => (dispatch) => {
  setAuthToken();
  dispatch({ type: LOGOUT });
};
