import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Badges from '../components/Badges'
import axios from 'axios'
import { apiUrl } from '../environment.js'
import gql from 'graphql-tag'
import { print } from 'graphql'

const { height, width } = Dimensions.get('window')

interface Props {
  user: UserLimited
  username: string
  showEvent: boolean
  setUserName: Function
  closeEvent: Function
  getEvents: Function
  allEvents: ObjectArray
  currentEvent: Event
}

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Event {
  name: string,
  id: number,
  description: string,
  location: string,
  attendees: Array<Attendee>,
  creator: Object
  }

interface Attendee {
  first_name: string
  email: string
  profile_photo: string
}

interface Creator {
  first_name: string,
  email: string,
  profile_photo: string
}


export class AnimatedProfile extends Component<Props> {
  async getAllEvents() {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: `
      query { Events {
          id
          name
          description
          cover_photo
          creator {
              first_name
              email
              profile_photo
          }
          start
          end
          location
          limit
          tags
          attendees {
              first_name
              email
              profile_photo
          }
          comments {
              id
          }
          }
      }
  `
    })
    this.props.getEvents(res.data.data.Events)
  }

  async unattendEvent() {
    const unattendEventMutation = gql`
      mutation UnattendEvent($eventId: String!, $userEmail: String!) {
        UnattendEvent(eventId: $eventId, userEmail: $userEmail)
      }
    `
    await axios.post(`${apiUrl}/graphql`, {
      query: print(unattendEventMutation),
      variables: {
        eventId: this.props.currentEvent.id,
        userEmail: this.props.user.email
      }
    })
    const getEvents = () => {
      this.getAllEvents()
    }
    getEvents()
  }

  async attendEvent() {
    const attendEventMutation = gql`
      mutation AttendEvent($eventId: String!, $user: UserLimitedInput!) {
        AttendEvent(eventId: $eventId, user: $user)
      }
    `
    await axios.post(`${apiUrl}/graphql`, {
      query: print(attendEventMutation),
      variables: {
        eventId: this.props.currentEvent.id,
        user: {
          first_name: this.props.user.first_name,
          email: this.props.user.email,
          profile_photo: this.props.user.profile_photo
        }
      }
    })
    const getEvents = () => {
      this.getAllEvents()
    }
    getEvents()
  }

  async componentDidUpdate() {
    if (this.props.showEvent) {
      this.yTranslate.setValue(0)
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start()
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start()
    }
  }

  yTranslate = new Animated.Value(0)

  componentWillUnmount() {
    this.props.closeEvent()
  }

  render() {
    let negativeHeight = -height
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    })
    let translateStyle = { transform: [{ translateY: modalMoveY }] }

    let rsvpButton
    if (this.props.allEvents.length > 0) {
      rsvpButton = this.props.allEvents.map(event => {
        if (event.id === this.props.currentEvent.id) {
          if (
            JSON.stringify(event.attendees).includes(
              JSON.stringify(this.props.user.email)
            )
          ) {
            return (
              <TouchableOpacity onPress={() => this.unattendEvent()} style={styles.event__button}>
                <Text style={styles.button__text}>Unattend</Text>
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity onPress={() => this.attendEvent()} style={styles.event__button}>
                <Text style={styles.button__text}>RSVP</Text>
              </TouchableOpacity>
            )
          }
        }
      })
    }
    return (
      <Animated.View style={[styles.contentContainer, translateStyle]}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.image__container}>
            {this.props.currentEvent.name === 'Quidditch After Party' && (
              <Image
                source={require('../assets/quidditch.jpg')}
                style={styles.animated__photo}
              />
            )}
            {this.props.currentEvent.name === 'Language Exchange' && (
              <Image
                source={require('../assets/language.jpg')}
                style={styles.animated__photo}
              />
            )}
          </View>
          <View style={styles.text__block}>
            <Text style={styles.event__title}>{this.props.currentEvent.name}</Text>
            <Text style={styles.event__subtitle}>Summary</Text>
            <Text style={styles.event__text}>{this.props.currentEvent.description}</Text>
            <Text style={styles.event__subtitle}>Location</Text>
            <Text style={styles.event__text}>{this.props.currentEvent.location}</Text>
          </View>
          <View style={styles.button__block}>
            <TouchableOpacity style={styles.event__button}>
              <Text style={styles.button__text}>Attendees</Text>
            </TouchableOpacity>
            {rsvpButton}
            <TouchableOpacity onPress={this.props.closeEvent} style={styles.event__button}>
              <Text style={styles.button__text}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    height: (height / 100) * 91.7,
    width: width,
    bottom: -height,
    backgroundColor: '#fff'
  },
  image__container: {
    width: '100%',
    height: 320
  },
  animated__photo: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 5
  },
  image_container: {},
  animated_photo: {},
  scrollView: {
    marginTop: 20
  }, 
  event__text: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: 16
  },
  event__title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "800"
  },
  event__subtitle: {
    marginTop: 20,
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "700"
  },
  text__block: {
    backgroundColor: "#e5e6e5",
    padding: 30,
    borderRadius: 5
  },
  button__block: {
    paddingBottom: 15,
    borderRadius: 5
  },
  event__button: {
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15,
  },
  button__text:{
    fontWeight: "800",
    color: "white"
  }
})

const mapStateToProps = state => {
  return {
    showEvent: state.showEvent,
    currentEvent: state.currentEvent,
    allEvents: state.allEvents,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeEvent: () => {
      dispatch({
        type: 'CLOSE_EVENT'
      })
    },
    getEvents: events => {
      dispatch({
        type: 'GET_EVENTS',
        events
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedProfile)
