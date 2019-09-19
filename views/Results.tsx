import React, { Component } from 'react'
import { Switch, StyleSheet, Animated, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import SwitchSelector from 'react-native-switch-selector'
import Hangouts from './Hangouts'
import Events from './Events'
import AnimatedProfile from './AnimatedProfile'
import EventModal from './EventModal'
import NewEvent from '../components/NewEvent'

const options = [
  { label: 'Hangout', value: 'hangouts' },
  { label: 'Events', value: 'events' }
]

interface Props {
  toggleResultsView: Function
  resultsSwitch: string
  activeSearch: boolean
  toggleActiveSearch: Function
}
class Results extends Component<Props> {
  componentDidMount() {
    this.props.toggleResultsView('hangouts')
  }

  render() {
    return (
      <>
        {!this.props.activeSearch ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>
              You are not active and will not be able to see other users
            </Text>
            <Button
              title="Become active"
              onPress={() => this.props.toggleActiveSearch()}
            ></Button>
          </View>
        ) : (
          <>
            <SwitchSelector
              options={options}
              backgroundColor="#e5e6e5"
              buttonColor="#73d961"
              initial={0}
              style={styles.results__switch}
              onPress={value => this.props.toggleResultsView(value)}
            />
            {this.props.resultsSwitch === 'hangouts' ? (
              <Hangouts />
            ) : (
              <Events />
            )}
            <EventModal />
          </>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  results__switch: {
    marginTop: 40,
    paddingBottom: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: "#000"
  }
})
const mapStateToProps = state => {
  return {
    resultsSwitch: state.resultsSwitch,
    activeSearch: state.activeSearch
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
    toggleActiveSearch: () => dispatch({ type: 'TOGGLE_ACTIVE_SEARCH' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
