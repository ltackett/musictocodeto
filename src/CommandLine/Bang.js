import React from 'react';

import 'CommandLine/Bang.scss';

const Bang = (props) => (
  <span id="bang">
    {props.symbol || '>'}
  </span>
);

export default Bang;
