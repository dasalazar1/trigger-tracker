import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';
import TriggerStats from './components/TriggerStats';

class App extends Component {
  state = {
    triggers: [],
    habits: []
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
    var tri = { _id: `trigger${Date.now()}`, trigger: trigger, habitCounts: {} };
    console.log('TCL: App -> tri', tri);
    const triggers = [...this.state.triggers, tri];
    console.log('TCL: App -> triggers', triggers);
    this.setState({
      triggers
    });

    this.props.history.push();
  };

  addHabit = habit => {
    let hab = { _id: `habit${Date.now()}`, habit: habit, triggerCounts: {} };
    let habits = [...this.state.habits, hab];
    this.setState({
      habits
    });
  };

  removeHabit = key => {
    const habits = this.state.habits;
    // delete habits[habits.findIndex(hab => hab._id === key)];
    this.setState({
      habits: habits.filter(hab => hab._id !== key)
    });
  };

  updateHabit = (habitKey, triggerKey) => {
    // get the current state
    let habits = this.state.habits;
    let triggers = this.state.triggers;
    // get individual habit and trigger
    let habit = habits.find(hab => hab._id === habitKey);
    let trigger = triggers.find(tri => tri._id === triggerKey);
    //  update reference list
    habit.triggerCounts[triggerKey] = habit.triggerCounts[triggerKey] + 1 || 1;
    trigger.habitCounts[habitKey] = trigger.habitCounts[habitKey] + 1 || 1;
    // set state
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
                triggers={this.state.triggers}
                habits={this.state.habits}
                addHabit={this.addHabit}
                removeHabit={this.removeHabit}
                updateHabit={this.updateHabit}
              />
            )}
          />
          <Route path="/stats" render={props => <TriggerStats triggers={this.state.triggers} habits={this.state.habits} />} />
        </div>
      </div>
    );
  }
}

export default App;
