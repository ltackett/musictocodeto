import React, { Component } from 'react';
import { CommandLine, Caret, Prompt } from 'components';
import Helmet from 'react-helmet';

export default class CLI extends Component {
  render() {
    const styles = require('./CLI.scss');

    return (
      <div className={styles.CLI}>
        <Helmet title=" "/>

        <p>MTCT</p>


        <Prompt />
        <CommandLine />
        <Caret />
      </div>
    );
  }
}
