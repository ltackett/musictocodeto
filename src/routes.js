import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    CLI,
    About,
    NotFound,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* CLI (main) route */ }
      <IndexRoute component={CLI}/>

      { /* Routes */ }
      <Route path="about" component={About}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
