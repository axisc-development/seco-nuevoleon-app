import axios from 'axios';
import {Platform} from 'react-native';

import {BASE_API} from '../config';

export const getDataCrimeAPI = async (crime, month, year, token) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      url: `${BASE_API}/api/v3/${crime}/${month}/${year}/`,
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

export const postEvent = async (token, text, img) => {
  let result = null;
  const formData = new FormData();

  if (Object.keys(img).length !== 0) {
    const photo = {
      // uri: `data:${img.type};base64,${img.data}`,
      uri: Platform.OS === 'ios' ? img.uri : img.path,
      type: img.type,
      name: 'evento_relevante_app.png',
      width: img.width,
      height: img.height,
      size: img.fileSize,
    };
    formData.append('imgBase64', photo);
  }
  formData.append('description', text);

  try {
    const {data} = await axios({
      method: 'POST',
      url: `${BASE_API}/api/v2/msejrafos/`,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
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

export const setCorporationsSelectedAPI = async (
  token,
  listCorporationsSelected,
) => {
  let result = null;
  try {
    const {data} = await axios({
      method: 'POST',
      data: {
        listCorporationsSelected: listCorporationsSelected.toString(),
      },
      url: `${BASE_API}/api/v2/users/corporations/`,
      headers: {
        Authorization: `Token ${token}`,
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

export const getMsejrafosAPI = async (token, corporations) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      url: `${BASE_API}/api/v2/msejrafos/`,
      params: {
        corporations,
        movil: 1,
      },
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

export const shareMsejrafoAPI = async (token, pk, level) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'PUT',
      url: `${BASE_API}/api/v2/msejrafos/`,
      data: {
        pk,
        level,
      },
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

export const getCorporationsAPI = async (token) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      url: `${BASE_API}/api/v2/platform/`,
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

export const getCrimesAPI = async (token) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      params: {
        movil: 1,
      },
      url: `${BASE_API}/api/v2/platform/`,
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

export const getMunicipalitiesAPI = async (token) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      params: {
        movil: 1,
      },
      url: `${BASE_API}/api/v2/platform/`,
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

export const getMarkersAPI = async (
  token,
  crimes,
  dates,
  year,
  municipalities,
) => {
  let result = null;

  try {
    const {data} = await axios({
      method: 'GET',
      params: {
        movil: 1,
        crimes,
        months: dates,
        years: year,
        municipalities,
        categories: 'all',
      },
      url: `${BASE_API}/api/v3/map/`,
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
