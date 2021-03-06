import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TriggerAdd extends Component {
  // static propTypes = {
  //   triggers: propTypes.object
  // };

  myInput = React.createRef();

  handleSubmit = event => {
    event.preventDefault();

    this.props.addTrigger(this.myInput.current.value);
    console.log('TCL: TriggerAdd -> this.myInput.value', this.myInput.current.value);

    this.props.history.push(`/menu`);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>What is your trigger?</p>
          <input type="text" required placeholder="Trigger" ref={this.myInput} />
          <br />
          <button type="submit" class="btn btn-primary">
            Add New Trigger ->
          </button>
        </form>
        <br />
        <Link to="/menu" class="nav-link">
          Go To Triggers
        </Link>
        <Link to="/stats" class="nav-link">
          Go To Stats
        </Link>
      </div>
    );
  }
}

export default TriggerAdd;
