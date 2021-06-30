import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_DATA_USER,
  NOTIFICATION_SAVE_TOKEN,
} from '../../constants';

const initialState = {
  isLoggedIn: false,
  user: '',
  dataUser: {},
  token: '',
  infoDeviceWithTokenPN: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      const {user, token} = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
        token,
      };
    }
    case SET_DATA_USER: {
      return {
        ...state,
        dataUser: action.payload,
      };
    }
    case NOTIFICATION_SAVE_TOKEN: {
      return {
        ...state,
        infoDeviceWithTokenPN: action.payload,
      };
    }
    case USER_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
