import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';
import middleware from './middleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['api', 'app'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger, ...middleware),
);

export const persistor = persistStore(store);

export default store;
