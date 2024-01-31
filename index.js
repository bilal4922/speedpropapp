

import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './redux/store';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();


const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
