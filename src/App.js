import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';

class App extends Component {
  state = {
    triggers: {}
  };

  componentDidMount() {
    //reinstate local storeage
    const localStorgeRef = localStorage.getItem(`triggers`);
    if (localStorgeRef) {
      this.setState({ triggers: JSON.parse(localStorgeRef) });
    }
  }

  componentDidUpdate() {
    console.log('It UPdated');
    localStorage.setItem(`triggers`, JSON.stringify(this.state.triggers));
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

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div className="App-body">
          <Route exact path="/" render={props => <TriggerAdd {...props} addTrigger={this.addTrigger} />} />
          <Route path="/menu" render={props => <TriggerMenu {...props} triggers={this.state.triggers} />} />
        </div>
      </div>
    );
  }
}

export default App;
