import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';
import TriggerStats from './components/TriggerStats';
import { Stitch, GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk';
import { fetchTriggers, fetchHabits, updateCounts, newHabit, newTrigger, deleteHabit } from './Utils';

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
        let { profile } = this.state.currentUser;
        console.log('email: ' + profile.email);
        Promise.all([fetchTriggers(profile.email), fetchHabits(profile.email)]).then(([tri, hab]) => {
          this.setState({ triggers: tri, habits: hab });
        });
      }
    });
  }

  componentDidUpdate() {}

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
    let { profile } = this.state.currentUser;
    console.log('addhabit');
    let details = { name: trigger, email: profile.email };
    newTrigger(details).then(() => {
      Promise.all([fetchTriggers(profile.email), fetchHabits(profile.email)]).then(([tri, hab]) => {
        this.setState({ triggers: tri, habits: hab });
      });
    });

    this.props.history.push();
  };

  addHabit = habit => {
    let { profile } = this.state.currentUser;
    console.log('addhabit');
    let details = { name: habit, email: profile.email };
    newHabit(details).then(() => {
      Promise.all([fetchTriggers(profile.email), fetchHabits(profile.email)]).then(([tri, hab]) => {
        this.setState({ triggers: tri, habits: hab });
      });
    });
  };

  removeHabit = key => {
    let { profile } = this.state.currentUser;
    deleteHabit(key).then(() => {
      Promise.all([fetchTriggers(profile.email), fetchHabits(profile.email)]).then(([tri, hab]) => {
        this.setState({ triggers: tri, habits: hab });
      });
    });
  };

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
