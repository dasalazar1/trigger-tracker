import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';

class App extends Component {
  state = {
    triggers: {},
    habits: {}
  };

  componentDidMount() {
    //reinstate local storeage
    const localStorgeRef = localStorage.getItem(`triggers`);
    if (localStorgeRef) {
      this.setState({ triggers: JSON.parse(localStorgeRef) });
    }
    const localStorgeHabitsRef = localStorage.getItem(`habits`);
    if (localStorgeHabitsRef) {
      this.setState({ habits: JSON.parse(localStorgeHabitsRef) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(`triggers`, JSON.stringify(this.state.triggers));
    localStorage.setItem(`habits`, JSON.stringify(this.state.habits));
  }

  addTrigger = trigger => {
    // take a copy of existing state
    const triggers = { ...this.state.triggers };
    // add new trigger to triggers var
    triggers[`trigger${Date.now()}`] = trigger;
    // set the new triggers object to state
    this.setState({
      triggers: triggers // if thay are the same name then just "triggers" is okay
    });

    this.props.history.push();
  };

  addHabit = habit => {
    const habits = { ...this.state.habits };
    habits[`habit${Date.now()}`] = { habit: habit, triggerCounts: {} };
    this.setState({
      habits: habits
    });
  };

  updateHabit = (habitKey, triggerKey) => {
    let habits = { ...this.state.habits };
    console.log('TCL: App -> updateHabit -> habits', habits);
    let habit = habits[habitKey];
    console.log('TCL: App -> updateHabit -> habit', habit);
    habit.triggerCounts[triggerKey] = habit.triggerCounts[triggerKey] + 1 || 1;
    this.setState({ habits });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div className="App-body">
          <Route exact path="/" render={props => <TriggerAdd {...props} addTrigger={this.addTrigger} />} />
          <Route
            path="/menu"
            render={props => (
              <TriggerMenu
                {...props}
                triggers={this.state.triggers}
                habits={this.state.habits}
                addHabit={this.addHabit}
                updateHabit={this.updateHabit}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
