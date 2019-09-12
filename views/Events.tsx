import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import EventList from '../components/EventList'
import { getEvents } from '../src/actions/events'

interface Props {
  getEvents: Function
}

class Events extends Component<Props> {
  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    return (
      <View style={styles.events}>
        <EventList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  events: {
    top: 40,
    flex: 1
  }
})

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(getEvents())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Events)
