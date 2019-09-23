import React from 'react'
import { updateEvent } from '../src/actions/events'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Button, Text, TextInput } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import moment from 'moment'
import Spinner from './Spinner'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { uploadPhoto } from '../src/actions/upload'

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
  updatedEvent: Event
  showStartDate: boolean
  showEndDate: boolean
  tagOptions: string[]
  loading: boolean
}

class EditEvent extends React.Component<Props, State> {
  state = {
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
    ].filter(tag => !this.props.event.tags.includes(tag)),
    loading: false
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

  handleUpload = async () => {
    this.setState({ loading: true })
    const image = await uploadPhoto()
    // one-lined this so that loading won't change until after image has been resolved
    this.setState({
      updatedEvent: { ...this.state.updatedEvent, cover_photo: image },
      loading: false
    })
  }

  handleSubmit = () => {
    const eventData = { ...this.state.updatedEvent }
    delete eventData.id
    this.props.updateEvent(this.props.event.id, eventData)
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.editEvent}>
        <Text style={styles.input__text}>Event Name</Text>
        <TextInput
          style={styles.event__input}
          placeholder={this.props.event.name}
          onChangeText={text =>
            this.setState({
              updatedEvent: { ...this.state.updatedEvent, name: text }
            })
          }
        />
        <Text style={styles.input__text}>Location</Text>
        <TextInput
          style={styles.event__input}
          placeholder={this.props.event.location}
          onChangeText={text =>
            this.setState({
              updatedEvent: { ...this.state.updatedEvent, location: text }
            })
          }
        />
        <Text style={styles.input__text}>Description</Text>
        <TextInput
          style={styles.event__input}
          placeholder={this.props.event.description}
          onChangeText={text =>
            this.setState({
              updatedEvent: { ...this.state.updatedEvent, description: text }
            })
          }
        />
        <Text>Attendee Limit</Text>
        <ModalDropdown
          value={this.props.event.limit}
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
          date={new Date(this.props.event.start)}
          minimumDate={new Date()}
          onConfirm={date =>
            this.setState({
              updatedEvent: { ...this.state.updatedEvent, start: date },
              showStartDate: false
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
          mode="datetime"
          date={new Date(this.props.event.end)}
          minimumDate={this.state.updatedEvent.start}
          onConfirm={date =>
            this.setState({
              updatedEvent: { ...this.state.updatedEvent, end: date },
              showEndDate: false
            })
          }
          onCancel={() => this.setState({ showEndDate: false })}
        />
        <Text>Cover Photo</Text>
        <Button title="Upload Photo" onPress={this.handleUpload} />
        <Text>Tags</Text>
        {this.state.updatedEvent.tags.map(tag => (
          <Text key={tag}>
            {tag} <Text onPress={() => this.removeTag(tag)}>delete</Text>
          </Text>
        ))}
        <ModalDropdown
          options={this.state.tagOptions}
          onSelect={(index, value) => this.addTag(value)}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Button title="Submit" onPress={() => this.handleSubmit()} />
        )}

        <Button
          title="Cancel Changes"
          onPress={() => this.props.closeEditEventForm()}
        />
      </ScrollView>
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
