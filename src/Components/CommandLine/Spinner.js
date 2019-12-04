import React, { useState, useEffect } from 'react';
import { CTX } from 'Contexts/Global';

export const spinnerStages = [
  '|',
  '/',
  '‒',
  '\\'
]

let spin

const Spinner = ({ settings, isCmdRunning, spinnerStage, setSpinnerStage }) => {
  useEffect(() => {
    if (isCmdRunning) {
      spin = setTimeout(() => {
        const nextStage = spinnerStage + 1
        const totalStages = spinnerStages.length - 1

        if (nextStage > totalStages) {
          setSpinnerStage(0)
        } else {
          setSpinnerStage(nextStage)
        }
      }, 75)
    }

    return () => clearTimeout(spin)
  }, [isCmdRunning, spinnerStage])

  if (settings.textOnly) {
    return <></>
  }

  return (
    <span id="spinner">
      {spinnerStages[spinnerStage]}
    </span>
  );
}

export default () => <CTX component={Spinner} />