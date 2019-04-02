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

  getValues = (xSource, ySource) => {
    let values = [];
    let xValues = Object.values(xSource);
    Array.from(xValues).forEach(xValue => {
      let properties = Object.keys(xValue);
      let value = {};
      value['x'] = xValue[`${properties[0]}`];
      let yValues = Object.keys(xValue[`${properties[1]}`]);
      yValues.forEach(key => {
        let v = ySource[key];
        let triggerName = v[Object.keys(v)[0]];
        value[triggerName] = xValue[`${properties[1]}`][key];
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
          <BarChart
            width={600}
            height={300}
            data={this.getValues(this.props.habits, this.props.triggers)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Tooltip />
            <XAxis dataKey="x" />
            {Object.values(this.props.triggers)
              .map(t => {
                return t.trigger;
              })
              .map((t, i) => {
                return <Bar dataKey={t} stackId="a" fill={this.state.colors[i]} />;
              })}
          </BarChart>
        </div>
        <div>
          <h2>Total number of times a trigger has been habit</h2>
          <BarChart
            width={600}
            height={300}
            data={this.getValues(this.props.triggers, this.props.habits)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Tooltip />
            <XAxis dataKey="x" />
            {Object.values(this.props.habits)
              .map(t => {
                return t.habit;
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
