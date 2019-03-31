import React, { Component } from 'react';
import TriggerModal from './triggerModal';

class TriggerMenu extends Component {
  state = {
    open: false,
    triggerKey: ''
  };

  myInput = React.createRef();

  onOpenModal = key => {
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
        {Object.keys(this.props.triggers).map(key => (
          <div key={key} index={key}>
            {this.props.triggers[key].trigger}
            <button onClick={() => this.onOpenModal(key)}>+</button>
          </div>
        ))}

        {modal}

        <h2>Habits</h2>
        {Object.keys(this.props.habits).map(key => (
          <div key={key}>
            {this.props.habits[key].habit}
            <button onClick={() => this.props.removeHabit(key)}>-</button>
          </div>
        ))}
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
