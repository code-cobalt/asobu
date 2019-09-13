import React from 'react'
import Modal from 'react-native-modal'
import { updateEvent } from '../src/actions/events'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'

interface Props {
  visible: boolean
}

interface State {}
class EditEvent extends React.Component<Props, State> {
  state = {}
  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        backdropOpacity={1}
        backdropColor="white"
      >
        <ScrollView contentContainerStyle={styles.editEvent}></ScrollView>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  editEvent: {
    marginTop: 60,
    alignItems: 'center'
  }
})
const mapStateToProps = state => {
  return {
    visible: state.showEditEventForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEvent: (eventId, updates) => dispatch(updateEvent(eventId, updates))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEvent)
