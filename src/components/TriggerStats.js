import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
        return { x: this.props.habits[habitKey].habit, y: Object.values(this.props.habits[habitKey].triggerCounts).reduce(this.getSum, 0) };
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
    console.log('TCL: TriggerStats -> render -> getValues', this.getValues());
    return (
      <React.Fragment>
        <div>
          <h2>Total number of times a habit has been triggered</h2>
          <BarChart width={600} height={300} data={this.getValues()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Tooltip />
            <XAxis dataKey="x" />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        </div>
      </React.Fragment>
    );
  }
}

export default TriggerStats;
