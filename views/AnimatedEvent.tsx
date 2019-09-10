import React, { Component } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, TextInput, Dimensions, Animated, Easing, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import Badges from "../components/Badges"
import axios from 'axios'
import getApiUrl from '../environment.js'
import gql from 'graphql-tag'
import { print } from 'graphql'

const { height, width } = Dimensions.get("window")

interface Props {
  user: User,
  username: string,
  showEvent: boolean,
  setUserName: Function,
  closeEvent: Function,
  getEvents: Function,
  allEvents: ObjectArray,
  currentEvent: Event
}

interface User {
  first_name: string,
  email: string,
  profile_photo: string
}

interface Event {
  name: string,
  id: number,
  description: string,
  location: string,
  attendees: Array<Attendee>
  }

interface Attendee {
  first_name: string,
  email: string,
  profile_photo: string
}


export class AnimatedProfile extends Component<Props> {

  async attendEvent() {
    
    const attendEventMutation = gql`
      mutation AttendEvent($eventId: String!, $user: UserLimitedInput!) {
        AttendEvent(eventId: $eventId, user: $user) 
      }
    `
    await axios.post(`${getApiUrl()}/graphql`, {
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
    const res = await axios.post(`${getApiUrl()}/graphql`, {
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

    let rsvpButton;
    if (this.props.allEvents.length > 0) {

      rsvpButton = this.props.allEvents.map(event => {
        console.log(event)
        if (event.id === this.props.currentEvent.id) {
          if (JSON.stringify(event.attendees).includes(JSON.stringify(this.props.user))) {
            return (
              <TouchableOpacity onPress={() => this.attendEvent()} style={styles.RSVP__button}>
                <Text>Unattend</Text>
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity onPress={() => this.attendEvent()} style={styles.RSVP__button}>
                <Text>RSVP</Text>
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
            {this.props.currentEvent.name === "Quidditch After Party" && <Image source={require("../assets/quidditch.jpg")} style={styles.animated__photo} />}
            {this.props.currentEvent.name === "Language Exchange" && <Image source={require("../assets/language.jpg")} style={styles.animated__photo} />}
          </View>
          <Text>{this.props.currentEvent.name}</Text>
          <Text>{this.props.currentEvent.description}</Text>
          <Text>{this.props.currentEvent.location}</Text>
          <TouchableOpacity style={styles.attendees__button}>
            <Text>Attendees</Text>
          </TouchableOpacity>
          {rsvpButton}
          <TouchableOpacity onPress={this.props.closeEvent} style={styles.event__close}>
            <Text>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    position: "absolute",
    height: (height / 100) * 91.7,    
    width: width,
    bottom: -height,
    backgroundColor: "#fff",
  },
  image__container: {
    width: "100%",
    height: 320
  },
  animated__photo: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  scrollView: {
    marginTop: 20
  }, 
  attendees__button: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  RSVP__button: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  event__close: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15
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
        type: "CLOSE_EVENT"
      })
    },
    getEvents: (events) => {
      dispatch({
          type: "GET_EVENTS",
          events
      })
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedProfile)
