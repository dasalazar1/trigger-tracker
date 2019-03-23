import React, { Component } from 'react';

class TriggerStats extends Component {
  getSum = (total, num) => {
    return total + num;
  };

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.habits).map(habitKey => (
          <div key={habitKey}>
            Habit: {this.props.habits[habitKey].habit}: {Object.values(this.props.habits[habitKey].triggerCounts).reduce(this.getSum)}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TriggerStats;
