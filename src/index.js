import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import './styles/index.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
let persistor = persistStore(store)

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
render(<Root />, document.getElementById('root'))