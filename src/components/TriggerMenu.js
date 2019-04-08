import React, { Component } from 'react';
import TriggerModal from './triggerModal';

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
    this.props.addHabit(this.myInput.current.value);
    console.log('TCL: HabitAdd -> this.myInput.value', this.myInput.current.value);
  };

  handleClick = (habitKey, triggerKey) => {
    console.log('TCL: TriggerMenu -> handleClick -> triggerKey', triggerKey);
    console.log('TCL: TriggerMenu -> handleClick -> habitKey', habitKey);
  };

  render() {
    console.log('menu');
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
        {this.props.triggers.length === 0 ? (
          <div />
        ) : (
          this.props.triggers.map(trigger => (
            <div key={trigger._id} index={trigger._id}>
              {trigger.trigger}
              <button onClick={() => this.onOpenModal(trigger._id)}>+</button>
            </div>
          ))
        )}

        {modal}

        <h2>Habits</h2>
        {this.props.habits.length === 0 ? (
          <div />
        ) : (
          this.props.habits.map(habit => (
            <div key={habit._id}>
              {this.props.habits.find(hab => hab._id === habit._id).habit}
              <button onClick={() => this.props.removeHabit(habit._id)}>-</button>
            </div>
          ))
        )}
        <form onSubmit={this.handleSubmit}>
          <input type="text" required placeholder="Add a new Habit" ref={this.myInput} />
          <br />
          <button type="submit">Add New Habit -></button>
        </form>
      </React.Fragment>
    );
  }
}

export default TriggerMenu;
