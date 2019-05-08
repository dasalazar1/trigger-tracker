import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class TriggerModal extends Component {
  render() {
    console.log('TCL: TriggerModal -> render -> this.props.triggerKey', this.props.triggerKey);
    console.table('TCL: TriggerModal -> render -> this.props.triggers', this.props.triggers);
    return (
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
          <h2>What habit did {this.props.triggers.find(tri => tri._id['$oid'] === this.props.triggerKey).name} trigger?</h2>
          {this.props.habits.map(habit => (
            <div key={habit._id['$oid']}>
              <button onClick={() => this.props.updateHabit(habit._id['$oid'], this.props.triggerKey)}>
                {this.props.habits.find(hab => hab._id['$oid'] === habit._id['$oid']).name}
              </button>
            </div>
          ))}
        </Modal>
      </React.Fragment>
    );
  }
}

export default TriggerModal;
