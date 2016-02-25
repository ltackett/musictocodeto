import React, { Component } from 'react';

export default class Prompt extends Component {
  state = {
    path: '/'
  }

  render = () => {
    const styles = require('./Prompt.scss');
    const {path} = this.state;

    return (
      <span className={styles.prompt}>$ {path} &gt;</span>
    );
  }
}
