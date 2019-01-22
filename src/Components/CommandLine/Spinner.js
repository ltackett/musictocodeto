import React, { useState, useEffect } from 'react';

const stages = [
  '|',
  '/',
  '‒',
  '\\'
]

export default () => {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const spin = setTimeout(() => {
      const nextStage = stage + 1
      const totalStages = stages.length - 1

      if (nextStage > totalStages) {
        setStage(0)
      } else {
        setStage(nextStage)
      }
    }, 75)

    return () => clearTimeout(spin)
  })

  return (
    <span id="spinner">
      {stages[stage]}
    </span>
  );
}
