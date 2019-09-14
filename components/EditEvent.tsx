import React from 'react'
import Modal from 'react-native-modal'
import { updateEvent } from '../src/actions/events'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Button, Text, TextInput } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

interface Props {
  visible: boolean
  event: Event
  updateEvent: Function
  closeEditEventForm: Function
}

interface Event {
  id: string
  name: string
  location: string
  description: string
  cover_photo: string
  limit: number
  start: Date
  end: Date
  tags: string[]
}

interface State {
  eventId: string
  updatedEvent: Event
  showStartDate: boolean
  showEndDate: boolean
  tagOptions: string[]
}

class EditEvent extends React.Component<Props, State> {
  state = {
    eventId: this.props.event.id,
    updatedEvent: { ...this.props.event },
    showStartDate: false,
    showEndDate: false,
    tagOptions: [
      'music',
      'sports',
      'art',
      'food',
      'social',
      'pet-friendly',
      'kid-friendly',
      'alcohol',
      'language',
      'education',
      'tech',
      'dance',
      'books'
    ].filter(tag => !this.props.event.tags.includes(tag))
  }

  addTag = tag => {
    this.setState({
      updatedEvent: {
        ...this.state.updatedEvent,
        tags: [...this.state.updatedEvent.tags, tag]
      },
      tagOptions: this.state.tagOptions.filter(option => option !== tag)
    })
  }

  removeTag = tag => {
    const tags = this.state.updatedEvent.tags.filter(
      eventTag => eventTag !== tag
    )
    this.setState({
      updatedEvent: { ...this.state.updatedEvent, tags },
      tagOptions: [...this.state.tagOptions, tag]
    })
  }

  handleSubmit = () => {
    const eventData = { ...this.state.updatedEvent }
    delete eventData.id
    this.props.updateEvent(this.state.eventId, eventData)
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        backdropOpacity={1}
        backdropColor="white"
      >
        <ScrollView contentContainerStyle={styles.editEvent}>
          <Text style={styles.input__text}>Event Name</Text>
          <TextInput
            style={styles.event__input}
            value={this.state.updatedEvent.name}
            onChangeText={text =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, name: text }
              })
            }
          />
          <Text style={styles.input__text}>Location</Text>
          <TextInput
            style={styles.event__input}
            value={this.state.updatedEvent.location}
            onChangeText={text =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, location: text }
              })
            }
          />
          <Text style={styles.input__text}>Description</Text>
          <TextInput
            style={styles.event__input}
            value={this.state.updatedEvent.location}
            onChangeText={text =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, description: text }
              })
            }
          />
          <Text>Attendee Limit</Text>
          <ModalDropdown
            value={this.state.updatedEvent.limit}
            options={Array.from(Array(101).keys()).slice(1)}
            onSelect={selection =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, limit: selection }
              })
            }
          />
          <Text>Start</Text>
          <Button
            title={moment(this.state.updatedEvent.start).format('LLL')}
            onPress={() => this.setState({ showStartDate: true })}
          />
          <DateTimePicker
            isVisible={this.state.showStartDate}
            mode="datetime"
            date={new Date(this.state.updatedEvent.start)}
            minimumDate={new Date()}
            onConfirm={date =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, start: date }
              })
            }
            onCancel={() => this.setState({ showStartDate: false })}
          />
          <Text>End</Text>
          <Button
            title={moment(this.state.updatedEvent.end).format('LLL')}
            onPress={() => this.setState({ showEndDate: true })}
          />
          <DateTimePicker
            isVisible={this.state.showEndDate}
            date={new Date(this.state.updatedEvent.end)}
            mode="datetime"
            minimumDate={new Date()}
            onConfirm={date =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, end: date }
              })
            }
            onCancel={() => this.setState({ showEndDate: false })}
          />
          <Text>Cover Photo</Text>
          <Text>Tags:</Text>
          {this.state.updatedEvent.tags &&
            this.state.updatedEvent.tags.map(tag => (
              <Text>
                {tag} <Text onPress={() => this.removeTag(tag)}>delete</Text>
              </Text>
            ))}
          <ModalDropdown
            options={this.state.tagOptions}
            onSelect={(index, value) => this.addTag(value)}
          />
          <Button title="Submit" onPress={() => this.handleSubmit()} />
          <Button
            title="Cancel Changes"
            onPress={() => this.props.closeEditEventForm()}
          />
        </ScrollView>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  editEvent: {
    marginTop: 60,
    alignItems: 'center'
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  text__formgroup: {
    width: '90%'
  },
  event__input: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 30,
    textAlign: 'center'
  },
  input__text: {
    alignSelf: 'center',
    fontWeight: '700'
  }
})
const mapStateToProps = state => {
  return {
    visible: state.showEditEventForm,
    event: state.currentEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEvent: (eventId, updates) => dispatch(updateEvent(eventId, updates)),
    closeEditEventForm: () => {
      dispatch({ type: 'CLOSE_EDIT_EVENT_FORM' })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEvent)
