import React, { Component } from 'react';
import TriggerModal from './triggerModal';
import { Link } from 'react-router-dom';

class TriggerMenu extends Component {
  state = {
    open: false,
    triggerKey: ''
  };

  myInput = React.createRef();

  onOpenModal = key => {
    console.log('TCL: TriggerMenu -> onOpenModal -> key', key);
    this.setState({ open: true, triggerKey: key });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('TCL: HabitAdd -> this.myInput.value', this.myInput.current.value);
    this.props.addHabit(this.myInput.current.value);
  };

  handleClick = (habitKey, triggerKey) => {
    console.log('TCL: TriggerMenu -> handleClick -> triggerKey', triggerKey);
    console.log('TCL: TriggerMenu -> handleClick -> habitKey', habitKey);
  };

  render() {
    let modal;

    if (this.state.open) {
      modal = (
        <TriggerModal
          open={this.state.open}
          onCloseModal={this.onCloseModal}
          triggers={this.props.triggers}
          triggerKey={this.state.triggerKey}
          habits={this.props.habits}
          updateHabit={this.props.updateHabit}
        />
      );
    }

    return (
      <React.Fragment>
        <h2>Triggers</h2>
        <ul class="container">
          {this.props.triggers.length === 0 ? (
            <div />
          ) : (
            this.props.triggers.map(trigger => (
              <li key={trigger._id['$oid']} index={trigger._id['$oid']} class="row pb-2 ">
                <div class="text-left col-sm-9">{trigger.name}</div>
                <button onClick={() => this.onOpenModal(trigger._id['$oid'])} class="btn btn-primary  col-sm-1">
                  +
                </button>
                <div class="col-sm-1" />
                <button onClick={() => this.props.removeTrigger(trigger._id['$oid'])} class="btn btn-danger  col-sm-1">
                  -
                </button>
              </li>
            ))
          )}
        </ul>
        {modal}

        <h2>Habits</h2>
        <ul class="container">
          {this.props.habits.length === 0 ? (
            <div />
          ) : (
            this.props.habits.map(habit => (
              <li key={habit._id['$oid']} class="row pb-2 ">
                <div class="text-left col-sm-11">{this.props.habits.find(hab => hab._id['$oid'] === habit._id['$oid']).name} </div>
                <button onClick={() => this.props.removeHabit(habit._id['$oid'])} class="btn btn-danger col-sm-1">
                  -
                </button>
              </li>
            ))
          )}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" required placeholder="Add a new Habit" ref={this.myInput} />
          <br />
          <button type="submit" class="btn btn-primary">
            Add New Habit ->
          </button>
        </form>

        <Link to="/stats">Go To Stats</Link>
      </React.Fragment>
    );
  }
}

export default TriggerMenu;
