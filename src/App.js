import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';

class App extends Component {
  state = {
    triggers: {}
  };

  addTrigger = trigger => {
    // take a copy of existing state
    const triggers = { ...this.state.triggers };
    // add new trigger to triggers var
    triggers[`trigger${Date.now()}`] = trigger;
    // set the new triggers object to state
    this.setState({
      triggers: triggers // if thay are the same name then just "triggers" is okay
    });

    this.props.history.push()
  };

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <body className="App-body">
          <TriggerAdd addTrigger={this.addTrigger} />
        </body>
      </div>
    );
  }
}

export default App;
