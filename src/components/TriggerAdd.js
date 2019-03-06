import React, { Component } from 'react';
import propTypes from 'prop-types';

class TriggerAdd extends Component {
  static propTypes = {
    triggers: propTypes.object
  };

  state = {
    newTrigger: null
  };

  render() {
    return (
      <form>
        <p>What is your trigger?</p>
        <button>
          
        </button>
      </form>
        
        

    )
  }
}

export default TriggerAdd;