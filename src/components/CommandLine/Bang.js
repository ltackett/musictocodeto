import React from 'react';

import './Bang.scss';

const Bang = (props) => (
  <span id="bang">
    {props.symbol || '>'}
  </span>
);

export default Bang;
