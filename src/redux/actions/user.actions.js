import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  USER_LOGIN,
  USER_LOGOUT,
  SET_DATA_USER,
} from '../../constants';
import {login, getPropertiesUserAPI} from '../../api';

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {},
});

export const userLogin = ({user, password}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await login(user, password);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({
          type: USER_LOGIN,
          payload: {user, token: response.token},
        });
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: e.message},
      });
    }
  };
};

export const getPropertiesUser = ({token}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await getPropertiesUserAPI(token);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({type: SET_DATA_USER, payload: response.data});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};
