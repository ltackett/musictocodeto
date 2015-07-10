/** @jsx React.DOM */
var React   = require('react');
var Store   = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
  getInitialState: function () {
    return {
      lines: Store.getLines(),
      STDIN: ''
    };
  },

  componentWillMount: function () {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function () {
    this.setState({
      lines: Store.getLines()
    });
  },

  runCommand: function (event) {
    event.preventDefault();
    var input = this.refs.STDIN.getDOMNode();
    actions.STDOUT(input.value);
    this.setState({
      STDIN: ''
    });
  },

  updateSTDIN: function (event) {
    this.setState({
      STDIN: event.target.value
    });
  },

  renderLine: function (message) {
    return (
      <div>{message}</div>
    );
  },

	render: function() {
		return (
			<div>
        {this.state.lines.map(this.renderLine)}
        <form onSubmit={this.runCommand}>
          <input ref="STDIN" type="text" value={this.state.STDIN} onChange={this.updateSTDIN}/>
        </form>
      </div>
		);
	}

});

module.exports = App;
