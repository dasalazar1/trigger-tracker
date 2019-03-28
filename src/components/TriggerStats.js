import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';

class TriggerStats extends Component {
  state = {
    habitBar: []
  };

  getSum = (total, num) => {
    return total + num;
  };

  getValues = () => {
    console.log('TCL: TriggerStats -> getValues -> habits', Object.keys(this.props.habits).length);
    if (Object.keys(this.props.habits).length > 0) {
      return Object.keys(this.props.habits).map(habitKey => {
        return { x: habitKey, y: Object.values(this.props.habits[habitKey].triggerCounts).reduce(this.getSum, 0) };
      });
    } else {
      return [];
    }
  };

  // componentDidMount = () => {
  //   console.log('TCL: TriggerStats -> componentDidMount -> habits', Object.keys(this.props.habits).length);
  //   if (Object.keys(this.props.habits).length > 0) {
  //     this.setState({
  //       habitBar: Object.keys(this.props.habits).map(habitKey => {
  //         return { x: habitKey, y: Object.values(this.props.habits[habitKey].triggerCounts).reduce(this.getSum, 0) };
  //       })
  //     });
  //   }
  // };

  render() {
    console.log('TCL: TriggerStats -> render -> habits', Object.keys(this.props.habits).length);
    return (
      <React.Fragment>
        <BarChart data={this.getValues()} />
      </React.Fragment>
    );
  }
}

export default TriggerStats;
