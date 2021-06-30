import axios from 'axios';

import {BASE_API} from '../config';

export const fetchSchedule = () =>
  fetch(URL).then((response) => Promise.all([response, response.json()]));

export const login = async (username, password) => {
  let result = null;
  const params = {username, password};

  try {
    let response = await fetch(`${BASE_API}/api-token-auth/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    response = await response.json();

    // validacion de errores
    if (response.hasOwnProperty('token')) {
      result = {token: response.token};
    } else if (response.hasOwnProperty('non_field_errors')) {
      result = {error: 'Usuario y/o contraseña invalida(s).'};
    } else {
      result = {error: 'No debe haber campos vacios.'};
    }
  } catch (e) {
    if (e.message.match(/Network request failed/)) {
      result = {
        error: true,
        errorMsg: 'Error al conectarse con el servidor de autenticación',
      };
    } else {
      // por ahora tratar todos los errores con un mensaje generico
      result = {
        error: true,
        errorMsg: 'Error al conectarse con el servidor de autenticación',
      };
    }
  }

  return result;
};

export const getPropertiesUserAPI = async (token) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      url: `${BASE_API}/api/v2/user/`,
      headers: {Authorization: `Token ${token}`},
    });

    if (!data.error) {
      result = data;
    } else {
      result = {
        error: 'Error al conectarse con el servidor.',
        errorSys: 'Se conecto al servidor pero hay error.',
      };
    }
  } catch (e) {
    result = {
      error: 'Error al conectarse con el servidor.',
      errorSys: e.message,
    };
  }

  return result;
};

export const registerDeviceAPI = async (token, infoDeviceWithTokenPN) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'POST',
      data: infoDeviceWithTokenPN,
      url: `${BASE_API}/api/v2/device/register/`,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!data.error) {
      result = data;
    } else {
      result = {
        error: 'Error al conectarse con el servidor.',
        errorSys: 'Se conecto al servidor pero hay error.',
      };
    }
  } catch (e) {
    result = {
      error: 'Error al conectarse con el servidor.',
      errorSys: e.message,
    };
  }

  return result;
};

export const unregisterDeviceAPI = async (token, infoDeviceWithTokenPN) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'POST',
      data: infoDeviceWithTokenPN,
      url: `${BASE_API}/api/v2/device/unregister/`,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!data.error) {
      result = data;
    } else {
      result = {
        error: 'Error al conectarse con el servidor.',
        errorSys: 'Se conecto al servidor pero hay error.',
      };
    }
  } catch (e) {
    result = {
      error: 'Error al conectarse con el servidor.',
      errorSys: e.message,
    };
  }

  return result;
};
