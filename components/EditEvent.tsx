import React from 'react'
import Modal from 'react-native-modal'
import { updateEvent } from '../src/actions/events'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Button, Text, TextInput } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'

interface Props {
  visible: boolean
  event: Event
  updatedEvent: Function
}

interface Event {
  name: string
  location: string
  description: string
  cover_photo: string
  limit: number | null
  start: Date | null
  end: Date | null
  tags: string[]
}

interface State {
  updatedEvent: Event
  tagsString: string
  showStartDate: boolean
  showEndDate: boolean
}

class EditEvent extends React.Component<Props, State> {
  state = {
    updatedEvent: this.props.event,
    tagsString: '',
    showStartDate: false,
    showEndDate: false
  }
  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        backdropOpacity={1}
        backdropColor="white"
      >
        <ScrollView contentContainerStyle={styles.editEvent}>
          <Text style={styles.input__text}>Name your Event!</Text>
          <TextInput
            style={styles.event__input}
            onChangeText={text =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, name: text }
              })
            }
          />
          <Text style={styles.input__text}>Set a Location!</Text>
          <TextInput
            style={styles.event__input}
            onChangeText={text =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, location: text }
              })
            }
          />
          <Text style={styles.input__text}>Tell us about it!</Text>
          <TextInput
            style={styles.event__input}
            onChangeText={text =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, description: text }
              })
            }
          />
          <Text>Attendee Limit</Text>
          <ModalDropdown
            options={Array.from(Array(101).keys()).slice(1)}
            onSelect={selection =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, limit: selection }
              })
            }
          />
          <Button
            title="Select Start"
            onPress={() => this.setState({ showStartDate: true })}
          />
          <DateTimePicker
            isVisible={this.state.showStartDate}
            mode="datetime"
            minimumDate={new Date()}
            onConfirm={date =>
              this.setState({
                updatedEvent: { ...this.state.updatedEvent, start: date }
              })
            }
            onCancel={() => this.setState({ showStartDate: false })}
          />
          <Button
            title="Select End"
            onPress={() => this.setState({ showEndDate: true })}
          />
          <DateTimePicker
            isVisible={this.state.showEndDate}
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
          <Text>Tags: {this.state.tagsString}</Text>
          <ModalDropdown
            options={[
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
            ]}
            onSelect={(index, value) => {
              this.state.updatedEvent.tags.length === 0
                ? this.setState({
                    tagsString: this.state.tagsString.concat(value)
                  })
                : this.setState({
                    tagsString: this.state.tagsString.concat(', ' + value)
                  })
              this.setState({
                updatedEvent: {
                  ...this.state.updatedEvent,
                  tags: [...this.state.updatedEvent.tags, value]
                }
              })
            }}
          />
          <Button
            title="Submit"
            onPress={() => this.props.updateEvent(this.state)}
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
    updateEvent: (eventId, updates) => dispatch(updateEvent(eventId, updates))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEvent)
