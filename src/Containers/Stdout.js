import React from 'react';
import { CTX } from 'Contexts/Global'

const Stdout = ({ stdoutLines}) => (
  <>
    {stdoutLines.length > 0 &&
      <ul id="stdout">
        {stdoutLines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    }
  </>
)

export default () => <CTX component={Stdout} />
