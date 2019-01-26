import React from 'react';
import ReactDOM from 'react-dom';

import App from 'Components/App';
import 'index.css'

import registerServiceWorker from 'registerServiceWorker';

const eventFire = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

eventFire(document, 'click');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
