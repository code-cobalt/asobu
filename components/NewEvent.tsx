import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView
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
    this.setState({ ...copiedState })
  }

  render() {
    return (
      <SafeAreaView>
        <Modal
          isVisible={this.props.visible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          backdropColor="black"
          style={styles.modal}
        >
          <ImageBackground style={styles.imageBackground} source={require("../assets/login.jpg")}>
          <ScrollView style={{ width: '100%' }} centerContent={true}>

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
                multiline={true}
                numberOfLines={5}
                style={styles.event__input}
                onChangeText={text =>
                  this.setState({
                    newEvent: { ...this.state.newEvent, description: text }
                  })
                }
              />
              <ModalDropdown
                defaultValue="Guest Limit"
                textStyle={styles.modal__dropdown__text}
                style={styles.modal__dropdown}
                options={Array.from(Array(101).keys()).slice(1)}
                onSelect={selection =>
                  this.setState({
                    newEvent: { ...this.state.newEvent, limit: selection }
                  })
                }
              />
              <TouchableOpacity
                style={styles.modal__dropdown}
                onPress={() => this.setState({ showStartDate: true })}
              >
                <Text style={styles.input__text}>Start Date</Text>
                {this.state.newEvent.start && (
                  <Text>{moment(this.state.newEvent.start).format('LLL')}</Text>
                )}
              </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.modal__dropdown}
                onPress={() => this.setState({ showEndDate: true })}
              >
                <Text style={styles.input__text}>End Date</Text>
                {this.state.newEvent.end && (
                  <Text>{moment(this.state.newEvent.end).format('LLL')}</Text>
                )}
              </TouchableOpacity>
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
              <TouchableOpacity style={styles.modal__dropdown} onPress={this.handleUpload} >
                <Text style={styles.input__text}>Upload Photo</Text>
              </TouchableOpacity>
              {this.state.newEvent.tags.map(tag => (
                <Text>
                  {tag} <Text onPress={() => this.removeTag(tag)}>delete</Text>
                </Text>
              ))}
              <ModalDropdown
                defaultValue="Tags"
                options={this.state.tagOptions}
                onSelect={(index, value) => this.addTag(value)}
                textStyle={styles.modal__dropdown__text}
                style={styles.modal__dropdown}
              />
              <TouchableOpacity
                style={styles.newEvent__button}
                onPress={() => this.props.createEvent(this.state.newEvent)}
              >
                <Text style={styles.input__text}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.newEvent__button}  
                onPress={() => this.props.closeNewEventForm()}
              >
                <Text style={styles.input__text}>Cancel</Text>
                
              </TouchableOpacity>
            </View>
          </ScrollView>
          </ImageBackground>
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    padding: 0
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text__formgroup: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    alignItems: 'center'
  },
  event__input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 30,
    textAlign: 'center'
  },
  input__text: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '800',
  },
  modal__dropdown__text: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: 14
  },
  modal__dropdown: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignSelf: 'center'
  },
  newEvent__button: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15,
    alignSelf: 'center'
  },
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
