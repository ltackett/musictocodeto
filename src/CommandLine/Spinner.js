import React, { Component } from 'react';

let timer;

const stages = [
  '|',
  '/',
  '‒',
  '\\'
]

class Spinner extends Component {
  constructor() {
    super();
    this.state = {
      stage: 0
    };
  }

  componentDidMount() {
    const spin = () => {
      const nextStage = this.state.stage + 1;
      const totalStages = stages.length - 1;

      if (nextStage > totalStages) {
        this.setState({ stage: 0 });
      } else {
        this.setState({ stage: nextStage })
      }

      timer = setTimeout(spin, 75);
    }

    spin();
  }

  componentWillUnmount() {
    clearTimeout(timer);
  }

  render() {
    const { stage } = this.state;

    return (
      <span id="spinner">
        {stages[stage]}
      </span>
    );
  }
}

export default Spinner;
