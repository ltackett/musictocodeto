import React, { Fragment } from 'react';
import { connect } from 'react-redux'

const Stdout = (props) => (
  <Fragment>
    {props.stdout.length > 0 &&
      <ul id="stdout">
        {props.stdout.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    }
  </Fragment>
)

const mapStateToProps = state => ({ stdout: state.stdout.stdoutLines })
export default connect(mapStateToProps, null)(Stdout)
