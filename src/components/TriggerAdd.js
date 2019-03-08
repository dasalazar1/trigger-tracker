import React, { Component } from 'react';
import propTypes from 'prop-types';

class TriggerAdd extends Component {
  // static propTypes = {
  //   triggers: propTypes.object
  // };

  myInput = React.createRef();

  render() {
    return (
      <form onSubmit={this.props.addTrigger}>
        <p>What is your trigger?</p>
        <input type="text" required placeholder="Trigger" ref={this.myInput} />
        <br />
        <button type="submit">Add New Trigger -></button>
      </form>
    );
  }
}

export default TriggerAdd;
