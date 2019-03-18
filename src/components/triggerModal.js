import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class TriggerModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
          <h2>What habit did {this.props.triggerKey} trigger?</h2>
          {Object.keys(this.props.habits).map(habitKey => (
            <div key={habitKey}>
              <button onClick={() => this.props.updateHabit(habitKey, this.props.triggerKey)}>{this.props.habits[habitKey].habit}</button>
            </div>
          ))}
        </Modal>
      </React.Fragment>
    );
  }
}

export default TriggerModal;
