import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchGraphData } from '../Utils';
import EJSON from 'ejson';

class TriggerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#a2ff00', '#00a2ff', '#a200ff', '#ff00a2', '#ffa200'],
      email: props.email,
      triggerData: [],
      habitData: [],
      data: [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
      ]
    };
  }

  getSum = (total, num) => {
    return total + num;
  };

  getValues = (xSource, ySource) => {
    return {};
  };

  getGraphData = email => {
    fetchGraphData(email).then(data => {
      //let data2 = EJSON.parse(JSON.stringify(data.triggerData));
      //console.log('called' + JSON.stringify(data2));
      this.setState({
        triggerData: JSON.parse(data.triggerData),
        habitData: JSON.parse(data.habitData)
      });
    });
  };

  componentDidMount() {
    this.getGraphData(this.state.email);
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.triggerData || this.state.triggerData.length === 0 ? (
          <div>no data</div>
        ) : (
          <div>
            <div>
              <h2>Total number of times a habit has been triggered</h2>
              <BarChart data={this.state.triggerData} width={600} height={300}>
                <XAxis dataKey="name" />
                <Tooltip />
                <YAxis />
                {Object.keys(this.state.triggerData[0]).map((k, i) => {
                  if (k == 'name') return '';
                  return <Bar stackId="a" dataKey={k} fill={this.state.colors[i]} />;
                })}
              </BarChart>
            </div>
            <div>
              <h2>Total number of times a trigger has caused a habit</h2>
              <BarChart data={this.state.habitData} width={600} height={300}>
                <XAxis dataKey="name" />
                <Tooltip />
                <YAxis />
                {Object.keys(this.state.habitData[0]).map((k, i) => {
                  if (k == 'name') return '';
                  return <Bar stackId="a" dataKey={k} fill={this.state.colors[i]} />;
                })}
              </BarChart>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TriggerStats;
