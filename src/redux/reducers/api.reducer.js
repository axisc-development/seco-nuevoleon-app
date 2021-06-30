import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from '../../constants';

const initialState = {
  error: '',
  isFetching: false,
  msg: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA: {
      return {...state, isFetching: true, error: ''};
    }
    case FETCHING_DATA_SUCCESS: {
      return {
        ...state,
        error: '',
        isFetching: false,
      };
    }
    case FETCHING_DATA_FAILURE: {
      const {error} = action.payload;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
