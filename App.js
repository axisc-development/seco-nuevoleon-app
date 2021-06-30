import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';
import {StatusBar} from 'react-native';

import store, {persistor} from './src/redux/store';
import Navigation from './src/navigation';
import SceneAppLoading from './src/scenes/auth/sceneAppLoading';

enableScreens();

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<SceneAppLoading />} persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
