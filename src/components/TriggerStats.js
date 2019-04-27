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
    console.log('TCL: getValues -> ySource', ySource);
    console.log('TCL: getValues -> xSource', xSource);
    return {};
  };

  render() {
    console.log('TCL: TriggerStats -> render -> habits', Object.keys(this.props.habits).length);
    console.log('TCL: TriggerStats -> render -> getValues', this.getValues());
    return (
      <React.Fragment>
        <div>
          <h2>Total number of times a habit has been triggered</h2>
          <BarChart
            width={600}
            height={300}
            data={this.getValues(this.props.habits, this.props.triggers)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          />
        </div>
        <div>
          <h2>Total number of times a trigger has been habit</h2>
          <BarChart
            width={600}
            height={300}
            data={this.getValues(this.props.triggers, this.props.habits)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TriggerStats;
