import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { compose, createStore } from 'redux';

import './index.css';
import App from './App';

import { tbCharApp } from './reducers/reducers';
import persistState from 'redux-localstorage';

const enhancer = compose(
  persistState('character')
);
const store = createStore(tbCharApp, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
