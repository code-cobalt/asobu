import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Event from '../components/Event'
import NewEvent from '../components/NewEvent'

interface Event {
  name: string
  id: number
  description: string
  location: string
  cover_photo: string
  attendees: Array<Attendee>
}

interface Attendee {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  allEvents: Array<Event>
  showForm: Function
}

class EventList extends React.Component<Props> {
  render() {
    const eventList = this.props.allEvents.map(event => {
      return <Event key={event.id} event={event} />
    })
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.showForm()}>
          <Text>Create Event</Text>
          <NewEvent />
        </TouchableOpacity>

        <ScrollView>{eventList}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  eventList: {
    bottom: 40
  }
})

const mapStateToProps = state => {
  return {
    allEvents: state.allEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showForm: () => {
      dispatch({ type: 'SHOW_NEW_EVENT_FORM' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)
