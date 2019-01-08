import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { store } from 'store'

import App from 'Components/App';
import 'index.css'

import registerServiceWorker from 'registerServiceWorker';

window.animate = false

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
