import {combineReducers} from 'redux';

import applicationReducer from './application.reducer';
import userReducer from './user.reducer';
import apiReducer from './api.reducer';
import appReducer from './app.reducer';

export default combineReducers({
  application: applicationReducer,
  user: userReducer,
  api: apiReducer,
  app: appReducer,
});
