import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';
import TriggerStats from './components/TriggerStats';
import { Stitch, GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk';
import { fetchTriggers, fetchHabits, updateCounts, postHabits, postTriggers } from './Utils';

class App extends Component {
  state = {
    triggers: [],
    habits: [],
    client: false,
    currentUser: false
  };

  componentDidMount() {
    this.setupStitch().then(() => {
      if (this.state.currentUser) {
        console.log('email: ' + this.state.currentUser.profile.email);
        Promise.all([fetchTriggers(this.state.currentUser.profile.email), fetchHabits(this.state.currentUser.profile.email)]).then(
          ([tri, hab]) => {
            this.setState({ triggers: tri, habits: hab });
          }
        );
      }
    });
  }

  componentDidUpdate() {
    //console.log(JSON.stringify(this.state.habits));
    //Promise.all([postTriggers(this.state.triggers), postHabits(this.state.habits)]);
  }

  async setupStitch() {
    if (!this.state.client) {
      const appId = 'stitchapp-lifjq';
      this.state.client = Stitch.hasAppClient(appId) ? Stitch.getAppClient(appId) : Stitch.initializeAppClient(appId);
    }

    if (this.state.client.auth.hasRedirectResult()) {
      await this.state.client.auth.handleRedirectResult().catch(console.error);
      console.log('Processed redirect result.');
    }

    if (this.state.client.auth.isLoggedIn) {
      // The user is logged in. Add their user object to component state.
      let currentUser = this.state.client.auth.user;
      this.setState({ currentUser });
    }
  }

  handleLogout = () => {
    this.state.client.auth.logout().then(() => {
      this.setState({ currentUser: false });
    });
  };

  handleLogin = async () => {
    // The user has not yet authenticated. Begin the Google login flow.
    const credential = new GoogleRedirectCredential();
    this.state.client.auth.loginWithRedirect(credential);
  };

  addTrigger = trigger => {
    var tri = { _id: `trigger${Date.now()}`, trigger: trigger, habitCounts: {}, email: this.state.currentUser.profile.email };
    const triggers = [...this.state.triggers, tri];
    this.setState({
      triggers
    });

    this.props.history.push();
  };

  addHabit = habit => {
    console.log('addhabit');
    let hab = { _id: `habit${Date.now()}`, habit: habit, triggerCounts: {}, email: this.state.currentUser.profile.email };
    let habits = [...this.state.habits, hab];

    this.setState({
      habits: habits
    });
  };

  removeHabit = key => {
    const habits = this.state.habits;
    habits[habits.findIndex(hab => hab._id === key)].habit = null;
    this.setState({
      habits
    });
  };

  // updateHabit = (habitKey, triggerKey) => {
  //   // get the current state
  //   let habits = this.state.habits;
  //   let triggers = this.state.triggers;
  //   // get individual habit and trigger
  //   let habit = habits.find(hab => hab._id === habitKey);
  //   let trigger = triggers.find(tri => tri._id === triggerKey);
  //   //  get the counts
  //   let triggerCounts = habit.triggerCounts;
  //   let habitCounts = trigger.habitCounts;
  //   // find the count to increment
  //   let triCount = triggerCounts.fine(tc => tc.trigger_id === triggerKey)
  //   let habCount = habitCounts.find(hc => hc.habit_id === habitKey)
  //   // ihcrement
  //   // set state
  //   this.setState({ habits });
  // };

  updateHabit = (habitKey, triggerKey) => {
    updateCounts(habitKey, triggerKey);
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <header className="App-header" />
        <div className="App-body">
          {!currentUser ? (
            <div>
              User must authenticate.<button onClick={this.handleLogin}>Sign In</button>
            </div>
          ) : (
            <div>
              {currentUser.profile.name}
              <button onClick={this.handleLogout}>Sign Out</button>
            </div>
          )}
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
