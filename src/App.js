import React, { Component } from 'react';
import './App.css';
import TriggerAdd from './components/TriggerAdd';
import { Route } from 'react-router-dom';
import TriggerMenu from './components/TriggerMenu';
import TriggerStats from './components/TriggerStats';
import { Stitch, GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk';
const User = ({ data: name }) =>
  name && (
    <div>
      <pre>{name}</pre>
    </div>
  );

class App extends Component {
  state = {
    triggers: [],
    habits: [],
    currentUser: false
  };

  componentDidMount() {
    this.setupStitch().then(() => {
      fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/getTriggers')
        .then(response => {
          console.log('response from atlas triggers: ' + response);
          return response.json();
        })
        .then(data => {
          console.log('data from atlas triggers: ' + JSON.stringify(data));
          this.setState({ triggers: data });
        });

      fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/getHabits')
        .then(response => {
          console.log('response from atlas habits: ' + response);
          return response.json();
        })
        .then(data => {
          console.log('data from atlas habits: ' + JSON.stringify(data));
          this.setState({ habits: data });
        });
    });
  }

  componentDidUpdate() {
    fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/setTriggers', {
      method: 'POST',
      //headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
      body: JSON.stringify(this.state.triggers)
    })
      .then(response => {
        if (!response.ok) {
          console.error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err.message);
      });

    fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/setHabits', {
      method: 'POST',
      //headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
      body: JSON.stringify(this.state.habits)
    })
      .then(response => {
        if (!response.ok) {
          console.error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err.message);
      });

    this.setState();
  }

  //start stitch setup
  async setupStitch() {
    //copy the name of your google-auth enabled stitch application here
    //the name of the app will typically be the stitch application name
    //with a "-"" + random string appended
    const appId = 'stitchapp-lifjq';

    // Get a client for your Stitch app, or instantiate a new one
    const client = Stitch.hasAppClient(appId) ? Stitch.getAppClient(appId) : Stitch.initializeAppClient(appId);

    //manage user authentication state

    // Check if this user has already authenticated and we're here
    // from the redirect. If so, process the redirect to finish login.
    if (client.auth.hasRedirectResult()) {
      await client.auth.handleRedirectResult().catch(console.error);
      console.log('Processed redirect result.');
    }

    if (client.auth.isLoggedIn) {
      // The user is logged in. Add their user object to component state.
      let currentUser = client.auth.user;
      this.setState({ currentUser });
    } else {
      // The user has not yet authenticated. Begin the Google login flow.
      const credential = new GoogleRedirectCredential();
      client.auth.loginWithRedirect(credential);
    }
  }
  //end stitch setup

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
    console.log('addhabit');
    let hab = { _id: `habit${Date.now()}`, habit: habit, triggerCounts: {} };
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
    //this.setState({ habits });
    this.setHabits(habits);
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <header className="App-header" />
        <div className="App-body">
          {!currentUser ? <div>User must authenticate.</div> : <div>{currentUser.profile.name}</div>}
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
