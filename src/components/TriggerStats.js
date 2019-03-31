import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { object } from 'prop-types';

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
        //unwind triggerCounts
        let counts = this.props.habits[habitKey].triggerCounts;
        let triggers = this.props.triggers;

        let triggerCounts = Object.keys(counts).map(triggerKey => {
          return {
            [triggers[triggerKey].trigger]: counts[triggerKey]
          };
        });

        let values = { habit: this.props.habits[habitKey].habit };
        triggerCounts.forEach(tc => {
          console.log(tc);
        });

        console.log('values: ' + JSON.stringify(values));

        return {
          values
        };
      });
    } else {
      return [];
    }
  };

  getValues2 = () => {
    let values = [];
    let habits = Object.values(this.props.habits);
    console.table(habits);
    Array.from(habits).forEach(habit => {
      console.log(habit.habit);
      let value = {};
      value['habit'] = habit.habit;
      let triggers = Object.keys(habit.triggerCounts);
      console.log(triggers);
      triggers.forEach(triggerKey => {
        let triggerName = this.props.triggers[triggerKey].trigger;
        console.log(triggerName, habit.triggerCounts[triggerKey]);
        value[triggerName] = habit.triggerCounts[triggerKey];
      });
      values.push(value);
    });
    console.log(values);
    return values;
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
    //console.log("TCL: TriggerStats -> render -> getValues", this.getValues());
    return (
      <React.Fragment>
        <div>
          <h2>Total number of times a habit has been triggered</h2>
          <BarChart width={600} height={300} data={this.getValues2()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Tooltip />
            <XAxis dataKey="habit" />

            <Bar dataKey="y" />
          </BarChart>
        </div>
      </React.Fragment>
    );
  }
}

export default TriggerStats;
