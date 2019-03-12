import React, { Component } from 'react';
import propTypes from 'prop-types';

class TriggerMenu extends Component {
  // static propTypes = {
  //   triggers: propTypes.object
  // };

  render() {
    console.log('menu');
    console.table(this.props.triggers);
    return (
      <React.Fragment>
        <h2>Triggers</h2>
        {Object.keys(this.props.triggers).map(key => (
          <div key={key}>{this.props.triggers[key]}</div>
        ))}
      </React.Fragment>
    );
  }
}

export default TriggerMenu;
