import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  SELECT_CRIME,
  SET_DATA,
  SET_MONTH_YEAR,
  SET_SLIDER_VALUE,
  // SET_MONTH_APP,
  SET_LIST_MSEJRAFO,
  SET_LIST_CORPORATIONS,
  SET_LIST_CORPORATIONS_SELECTED,
  SET_LIST_CRIMES,
  SET_LIST_CRIMES_SELECTED,
  SET_LIST_MUNICIPALITIES,
  SET_LIST_MUNICIPALITIES_SELECTED,
  SET_LIST_DATES_SELECTED,
  SET_ALL_DATES_SELECTED,
  SET_ALL_MUNICIPALITIES_SELECTED,
  SET_MARKERS,
  SET_YEAR_SELECTED,
  UPDATE_SELECTED_DATE,
  CHANGE_TAB_COLOR,
} from '../../constants';
import {
  getDataCrimeAPI,
  postEvent,
  getMsejrafosAPI,
  shareMsejrafoAPI,
  getCorporationsAPI,
  getCrimesAPI,
  getMunicipalitiesAPI,
  getMarkersAPI,
  setCorporationsSelectedAPI,
} from '../../api';

export const getDataCrime = (crime, month, year, token) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      let monthPlus = month + 1; // porque python empieza los meses en 1 y JS en 0
      monthPlus = String(monthPlus).padStart(2, '0');
      const response = await getDataCrimeAPI(crime, monthPlus, year, token);

      response.data.sixA.title.text = '6 años';
      response.data.fourA.title.text = '4 años';
      response.data.oneA.title.text = '1 año';

      // table
      response.data.table.currentY =
        response.data.ca.series[response.data.ca.series.length - 1];
      response.data.table.previousY =
        response.data.ca.series[response.data.ca.series.length - 2];
      response.data.table.totals = {};
      response.data.table.totals.average = response.data.table.average.total;
      response.data.table.totals.subtraction =
        response.data.table.average.subtraction;
      response.data.table.totals.current =
        response.data.ca.series[response.data.ca.series.length - 1].total;
      response.data.table.totals.previous =
        response.data.ca.series[response.data.ca.series.length - 2].total;

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error, errorSys: response.errorSys},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({
          type: SET_DATA,
          payload: {data: response},
        });
        dispatch({
          type: SELECT_CRIME,
          payload: {crime},
        });
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: e},
      });
    }
  };
};

export const changeMonthYearString = (
  month,
  year,
  monthYearString /* initialMonthAPP = -1 */,
) => {
  return async (dispatch) => {
    dispatch({
      type: SET_MONTH_YEAR,
      payload: {month, year, monthYearString},
    });
    // if (initialMonthAPP ø!== -1) {
    //   dispatch({
    //     type: SET_MONTH_APP,
    //     payload: initialMonthAPP,
    //   });
    // }
  };
};

export const sendMsejrafoToServer = ({token, text, image}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    const response = await postEvent(token, text, image);

    if (response.error) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: response.error},
      });
    } else {
      dispatch({
        type: FETCHING_DATA_SUCCESS,
      });
    }
  };
};

export const getMsejrafos = ({token, corporations}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await getMsejrafosAPI(token, corporations);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({type: SET_LIST_MSEJRAFO, payload: response.data});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const shareMsejrafo = ({token, pk, level}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await shareMsejrafoAPI(token, pk, level);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const getCorporations = ({token}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await getCorporationsAPI(token);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({type: SET_LIST_CORPORATIONS, payload: response.data.zonas});
        if (
          response.data.corporations_selected !== '' &&
          response.data.corporations_selected !== 'nan'
        ) {
          dispatch({
            type: SET_LIST_CORPORATIONS_SELECTED,
            payload: response.data.corporations_selected.split(','),
          });
        }
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const getCrimes = ({token}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await getCrimesAPI(token);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({type: SET_LIST_CRIMES, payload: response.data.crimes});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const getMunicipalities = ({token}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await getMunicipalitiesAPI(token);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({
          type: SET_LIST_MUNICIPALITIES,
          payload: response.data.municipalities,
        });

        // seleccionar todos los municipios para un estado inicial
        const listMunicipalitiesSelected = [];
        for (let i = 0; i < response.data.municipalities.length; i++) {
          listMunicipalitiesSelected.push(response.data.municipalities[i].slug);
        }

        dispatch({
          type: SET_LIST_MUNICIPALITIES_SELECTED,
          payload: listMunicipalitiesSelected,
        });
        dispatch({type: SET_ALL_MUNICIPALITIES_SELECTED, payload: true});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const getMarkers = ({
  token,
  crimes,
  dates,
  year,
  municipalities,
  // eslint-disable-next-line arrow-body-style
}) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await getMarkersAPI(
        token,
        crimes,
        dates,
        year,
        municipalities,
      );

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
        dispatch({type: SET_MARKERS, payload: response.data});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const changeSliderValue = (value) => ({
  type: SET_SLIDER_VALUE,
  payload: value,
});

export const compressSectionCorporation = (clone) => ({
  type: SET_LIST_CORPORATIONS,
  payload: clone,
});

export const setCorporationsSelected = (token, clone) => {
  return async (dispatch) => {
    // dispatch({ type: FETCHING_DATA });

    dispatch({
      type: SET_LIST_CORPORATIONS_SELECTED,
      payload: clone,
    });

    try {
      const response = await setCorporationsSelectedAPI(token, clone);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
        dispatch({
          type: SET_LIST_CORPORATIONS_SELECTED,
          payload: [],
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: 'Error al conectarse al servidor. Intente mas tarde.'},
      });
    }
  };
};

export const setCrimesSelected = (clone) => ({
  type: SET_LIST_CRIMES_SELECTED,
  payload: clone,
});

export const setMunicipalitiesSelected = (clone) => ({
  type: SET_LIST_MUNICIPALITIES_SELECTED,
  payload: clone,
});

export const setDatesSelected = (clone) => ({
  type: SET_LIST_DATES_SELECTED,
  payload: clone,
});

export const setAllDatesSelected = (value) => ({
  type: SET_ALL_DATES_SELECTED,
  payload: value,
});

export const setAllMunicipalitiesSelected = (value) => ({
  type: SET_ALL_MUNICIPALITIES_SELECTED,
  payload: value,
});

export const setYearSelected = (year) => ({
  type: SET_YEAR_SELECTED,
  payload: year,
});

export const updateSelectedDate = (month, year) => ({
  type: UPDATE_SELECTED_DATE,
  payload: {month, year},
});

export const changeColorTab = (value) => ({
  type: CHANGE_TAB_COLOR,
  payload: value,
});
