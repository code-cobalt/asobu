import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
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
      <SafeAreaView style={styles.events}>
        <EventList />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  events: {
    flex: 1,
    marginTop: 5,
    marginBottom: 25,
    backgroundColor: '#e5e6e5'
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
