import React, { Component } from 'react';

export default class Caret extends Component {
  render() {
    const styles = require('./Caret.scss');

    return (
      <span className={styles.caret}></span>
    );
  }
}
