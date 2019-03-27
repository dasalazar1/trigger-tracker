import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';

class TriggerStats extends Component {
  state = {
    habitBar: []
  };

  getSum = (total, num) => {
    return total + num;
  };

  render() {
    console.log('TCL: TriggerStats -> render -> habits', Object.keys(this.props.habits).length);
    if (Object.keys(this.props.habits).length > 0) {
      this.state.habitBar = Object.keys(this.props.habits).map(habitKey => {
        return { x: habitKey, y: Object.values(this.props.habits[habitKey].triggerCounts).reduce(this.getSum, 0) };
      });
    }

    // if (habits) {
    //   habits.reduce(r => {
    //     return this.state.habitBar.push({ x: r.habit, y: r.triggerCounts.reduce(this.getsum) });
    //   });
    // }

    return (
      <React.Fragment>
        {Object.keys(this.props.habits).map(habitKey => (
          <div key={habitKey}>
            Habit: {this.props.habits[habitKey].habit}: {Object.values(this.props.habits[habitKey].triggerCounts).reduce(this.getSum)}
          </div>
        ))}
        <BarChart data={this.state.habitBar} />
      </React.Fragment>
    );
  }
}

export default TriggerStats;
