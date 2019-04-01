import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { object } from 'prop-types';

class TriggerStats extends Component {
  state = {
    colors: ['#a2ff00', '#00a2ff', '#a200ff', '#ff00a2', '#ffa200']
  };

  getSum = (total, num) => {
    return total + num;
  };

  getValues = () => {
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

  render() {
    console.log('TCL: TriggerStats -> render -> habits', Object.keys(this.props.habits).length);
    //console.log("TCL: TriggerStats -> render -> getValues", this.getValues());
    return (
      <React.Fragment>
        <div>
          <h2>Total number of times a habit has been triggered</h2>
          <BarChart width={600} height={300} data={this.getValues()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Tooltip />
            <XAxis dataKey="habit" />
            {Object.values(this.props.triggers)
              .map(t => {
                return t.trigger;
              })
              .map((t, i) => {
                return <Bar dataKey={t} stackId="a" fill={this.state.colors[i]} />;
              })}
          </BarChart>
        </div>
      </React.Fragment>
    );
  }
}

export default TriggerStats;
