import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { attendEvent, unattendEvent, deleteEvent } from '../src/actions/events'
import Comments from '../components/Comments'

const { height, width } = Dimensions.get('window')

interface Props {
  user: UserLimited
  username: string
  showEvent: boolean
  setUserName: Function
  closeEvent: Function
  getEvents: Function
  showEditEventForm: Function
  currentEvent: Event
  attendEvent: Function
  unattendEvent: Function
  deleteEvent: Function
}

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Comment {
  id: string
  content: string
  timestamp: Date
  from: UserLimited
}

interface Event {
  name: string
  id: number
  cover_photo: string
  description: string
  location: string
  attendees: Array<UserLimited>
  creator: UserLimited
  comments: Array<Comment>
}

export class AnimatedEvent extends Component<Props> {
  componentDidUpdate() {
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

  render() {
    let negativeHeight = -height
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    })
    let translateStyle = { transform: [{ translateY: modalMoveY }] }

    let rsvpButton
    if (
      this.props.currentEvent.attendees &&
      this.props.currentEvent.attendees
        .map(attendees => attendees.email)
        .includes(this.props.user.email)
    ) {
      rsvpButton = (
        <TouchableOpacity
          onPress={() =>
            this.props.unattendEvent(
              this.props.currentEvent.id,
              this.props.user.email
            )
          }
          style={styles.event__button}
        >
          <Text style={styles.button__text}>Unattend</Text>
        </TouchableOpacity>
      )
    } else {
      rsvpButton = (
        <TouchableOpacity
          onPress={() =>
            this.props.attendEvent(this.props.currentEvent.id, this.props.user)
          }
          style={styles.event__button}
        >
          <Text style={styles.button__text}>RSVP</Text>
        </TouchableOpacity>
      )
    }

    let editButton
    let deleteButton
    if (
      this.props.currentEvent.creator &&
      this.props.user.email === this.props.currentEvent.creator.email
    ) {
      editButton = (
        <TouchableOpacity
          style={styles.event__button}
          onPress={() => this.props.showEditEventForm()}
        >
          <Text style={styles.button__text}>Edit Event</Text>
        </TouchableOpacity>
      )
      deleteButton = (
        <TouchableOpacity
          style={styles.event__button}
          onPress={() => this.props.deleteEvent(this.props.currentEvent.id)}
        >
          <Text style={styles.button__text}>Delete Event</Text>
        </TouchableOpacity>
      )
    }

    return (
      <Animated.View style={[styles.contentContainer, translateStyle]}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.back} onPress={() => this.props.closeEvent()}>
            {'<'}
          </Text>
          <View style={styles.image__container}>
            <Image
              source={{ uri: this.props.currentEvent.cover_photo }}
              style={styles.animated__photo}
            />
          </View>
          <View style={styles.text__block}>
            <Text style={styles.event__title}>
              {this.props.currentEvent.name}
            </Text>
            <Text style={styles.event__subtitle}>Summary</Text>
            <Text style={styles.event__text}>
              {this.props.currentEvent.description}
            </Text>
            <Text style={styles.event__subtitle}>Location</Text>
            <Text style={styles.event__text}>
              {this.props.currentEvent.location}
            </Text>
          </View>
          <View style={styles.button__block}>
            <TouchableOpacity style={styles.event__button}>
              <Text style={styles.button__text}>Attendees</Text>
            </TouchableOpacity>
            {rsvpButton}
            {editButton}
            {deleteButton}
          </View>
          <Comments comments={this.props.currentEvent.comments} />
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  back: { marginTop: 25, marginBottom: 25, marginLeft: 10, fontSize: 20 },
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
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 16
  },
  event__title: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '800'
  },
  event__subtitle: {
    marginTop: 20,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '700'
  },
  text__block: {
    backgroundColor: '#e5e6e5',
    padding: 30,
    borderRadius: 5
  },
  button__block: {
    paddingBottom: 15,
    borderRadius: 5
  },
  event__button: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  button__text: {
    fontWeight: '800',
    color: 'white'
  }
})

const mapStateToProps = state => {
  return {
    showEvent: state.showEvent,
    currentEvent: state.currentEvent,
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
    showEditEventForm: () => {
      dispatch({
        type: 'SHOW_EDIT_EVENT_FORM'
      })
    },
    attendEvent: (eventId, user) => dispatch(attendEvent(eventId, user)),
    unattendEvent: (eventId, userEmail) =>
      dispatch(unattendEvent(eventId, userEmail)),
    deleteEvent: eventId => dispatch(deleteEvent(eventId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedEvent)
