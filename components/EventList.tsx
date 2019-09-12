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
}

class EventList extends React.Component<Props> {
  state = {}
  showForm() {}

  render() {
    const eventList = this.props.allEvents.map(event => {
      return <Event key={event.id} event={event} />
    })
    return (
      <View>
        <TouchableOpacity onPress={() => this.showForm()}>
          <Text>Create Event</Text>
          {/* <NewEvent visible={true}/> */}
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

export default connect(mapStateToProps)(EventList)
