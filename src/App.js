import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';
import TriggerStats from './components/TriggerStats';
import { Stitch, GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk';
import { fetchTriggers, fetchHabits, updateCounts, newHabit, newTrigger, deleteHabit, deleteTrigger } from './Utils';

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

  removeTrigger = key => {
    let { profile } = this.state.currentUser;
    deleteTrigger(key).then(() => {
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
        <header className="App-header ">
          {!currentUser ? (
            <nav class="navbar right col-md-4 offset-md-8">
              User must authenticate.
              <button onClick={this.handleLogin} class="btn btn-info">
                Sign In
              </button>
            </nav>
          ) : (
            <React.Fragment>
              <nav class="navbar right col-md-4 offset-md-8">
                {currentUser.profile.name}
                <button onClick={this.handleLogout} class="btn btn-info">
                  Sign Out
                </button>
              </nav>
            </React.Fragment>
          )}
        </header>
        <div className="App-body">
          {!currentUser ? (
            <div />
          ) : (
            <React.Fragment>
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
                    removeTrigger={this.removeTrigger}
                  />
                )}
              />
              <Route
                path="/stats"
                render={props => (
                  <TriggerStats
                    triggerData={this.state.triggerData}
                    habitData={this.state.habitData}
                    email={currentUser.profile.email}
                    getGraphData={this.getGraphData}
                  />
                )}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
