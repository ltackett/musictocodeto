import React from 'react';

import CommandLine from 'CommandLine';
import Stdout from 'Stdout'

import 'App.scss';

export default () => (
  <div>
    <Stdout />
    <CommandLine />
  </div>
)
