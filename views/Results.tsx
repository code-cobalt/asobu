import React, { Component } from 'react'
import { StyleSheet, Animated, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import SwitchSelector from 'react-native-switch-selector'
import Hangouts from './Hangouts'
import Events from './Events'
import AnimatedProfile from './AnimatedProfile'
import EventModal from './EventModal'
import NewEvent from '../components/NewEvent'
import { toggleActive } from '../src/actions/users'
import AttendeesModal from '../components/AttendeesModal'

const options = [
  { label: 'Hangout', value: 'hangouts' },
  { label: 'Events', value: 'events' }
]

interface Props {
  toggleResultsView: Function
  resultsSwitch: string
  isActive: boolean
  toggleActiveSearch: Function
  latitude: number
  longitude: number
  email: string
}
class Results extends Component<Props> {
  componentDidMount() {
    this.props.toggleResultsView('hangouts')
  }

  setUserLocation() {
    const updatedUser = {
      longitude: this.props.longitude,
      latitude: this.props.latitude,
      is_active: true
    }
    this.props.toggleActiveSearch(this.props.email, updatedUser)
  }

  render() {
    return (
      <>
        <SwitchSelector
          options={options}
          backgroundColor="#e5e6e5"
          buttonColor="#73d961"
          initial={0}
          style={styles.results__switch}
          onPress={value => this.props.toggleResultsView(value)}
        />
        {this.props.resultsSwitch === 'hangouts' ? <Hangouts /> : <Events />}
        <EventModal />
      </>
    )
  }
}

const styles = StyleSheet.create({
  results__switch: {
    marginTop: 40,
    paddingBottom: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: '#000'
  }
})
const mapStateToProps = state => {
  return {
    resultsSwitch: state.resultsSwitch,
    isActive: state.isActive,
    latitude: state.latitude,
    longitude: state.longitude,
    email: state.user.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleResultsView: activeView => {
      dispatch({
        type: 'TOGGLE_RESULTS_VIEW',
        activeView
      })
    },
    toggleActiveSearch: (email, updatedUser) =>
      dispatch(toggleActive(email, updatedUser))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
