import React from 'react';
import { CTX } from 'Contexts/Global'

const Stdout = ({ stdoutLines}) => (
  <React.Fragment>
    {stdoutLines.length > 0 &&
      <ul id="stdout">
        {stdoutLines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    }
  </React.Fragment>
)

export default () => <CTX component={Stdout} />
