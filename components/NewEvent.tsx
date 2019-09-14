import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  ScrollView
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { connect } from 'react-redux'
import { createEvent } from '../src/actions/events'
import Modal from 'react-native-modal'
import moment from 'moment'
import { uploadPhoto } from '../src/actions/upload'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  visible: boolean
  createEvent: Function
  currentUserLimited: UserLimited
  closeNewEventForm: Function
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
  newEvent: Event
  showStartDate: boolean
  showEndDate: boolean
  tagOptions: string[]
}

class NewEvent extends React.Component<Props, State> {
  state = {
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
    ],
    newEvent: {
      name: '',
      location: '',
      description: '',
      cover_photo: '',
      limit: 10,
      start: null,
      end: null,
      tags: [],
      creator: this.props.currentUserLimited
    }
  }

  addTag = tag => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        tags: [...this.state.newEvent.tags, tag]
      },
      tagOptions: this.state.tagOptions.filter(option => option !== tag)
    })
  }

  removeTag = tag => {
    const tags = this.state.newEvent.tags.filter(eventTag => eventTag !== tag)
    this.setState({
      newEvent: { ...this.state.newEvent, tags },
      tagOptions: [...this.state.tagOptions, tag]
    })
  }

  handleUpload = async () => {
    const image = await uploadPhoto()
    const copiedState = { ...this.state }
    copiedState.newEvent.cover_photo = image
    this.setState({ ...copiedState }, () => console.log(this.state))
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={1}
        backdropColor="white"
      >
        <ScrollView contentContainerStyle={styles.newEvent}>
          <View style={styles.text__formgroup}>
            <Text style={styles.input__text}>Name your Event!</Text>
            <TextInput
              style={styles.event__input}
              onChangeText={text =>
                this.setState({
                  newEvent: { ...this.state.newEvent, name: text }
                })
              }
            />
            <Text style={styles.input__text}>Set a Location!</Text>
            <TextInput
              style={styles.event__input}
              onChangeText={text =>
                this.setState({
                  newEvent: { ...this.state.newEvent, location: text }
                })
              }
            />
            <Text style={styles.input__text}>Tell us about it!</Text>
            <TextInput
              style={styles.event__input}
              onChangeText={text =>
                this.setState({
                  newEvent: { ...this.state.newEvent, description: text }
                })
              }
            />
            <Text>Attendee Limit</Text>
            <ModalDropdown
              options={Array.from(Array(101).keys()).slice(1)}
              onSelect={selection =>
                this.setState({
                  newEvent: { ...this.state.newEvent, limit: selection }
                })
              }
            />
            <Button
              title="Select Start"
              onPress={() => this.setState({ showStartDate: true })}
            />
            {this.state.newEvent.start && (
              <Text>{moment(this.state.newEvent.start).format('LLL')}</Text>
            )}
            <DateTimePicker
              isVisible={this.state.showStartDate}
              mode="datetime"
              minimumDate={new Date()}
              onConfirm={date =>
                this.setState({
                  newEvent: { ...this.state.newEvent, start: date },
                  showStartDate: false
                })
              }
              onCancel={() => this.setState({ showStartDate: false })}
            />
            <Button
              title="Select End"
              onPress={() => this.setState({ showEndDate: true })}
            />
            {this.state.newEvent.end && (
              <Text>{moment(this.state.newEvent.end).format('LLL')}</Text>
            )}
            <DateTimePicker
              isVisible={this.state.showEndDate}
              mode="datetime"
              minimumDate={new Date(this.state.newEvent.start)}
              onConfirm={date =>
                this.setState({
                  newEvent: { ...this.state.newEvent, end: date },
                  showEndDate: false
                })
              }
              onCancel={() => this.setState({ showEndDate: false })}
            />
            <Text>Cover Photo</Text>
            <Button title="Upload Photo" onPress={this.handleUpload} />
            <Text>Tags</Text>
            {this.state.newEvent.tags.map(tag => (
              <Text>
                {tag} <Text onPress={() => this.removeTag(tag)}>delete</Text>
              </Text>
            ))}
            <ModalDropdown
              options={this.state.tagOptions}
              onSelect={(index, value) => this.addTag(value)}
            />
            <Button
              title="Submit"
              onPress={() => this.props.createEvent(this.state.newEvent)}
            />
            <Button
              title="Cancel"
              onPress={() => this.props.closeNewEventForm()}
            />
          </View>
        </ScrollView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  text__formgroup: {
    width: '90%'
  },
  newEvent: {
    marginTop: 60,
    alignItems: 'center'
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
    visible: state.showNewEventForm,
    currentUserLimited: {
      first_name: state.user.first_name,
      email: state.user.email,
      profile_photo: state.user.profile_photo
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createEvent: newEvent => dispatch(createEvent(newEvent)),
    closeNewEventForm: () => {
      dispatch({ type: 'CLOSE_NEW_EVENT_FORM' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEvent)
