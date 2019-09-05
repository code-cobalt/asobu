import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Meets from './Meets'
import Events from './Events'
import Profile from './Profile'
import getApiUrl from '../environment.js'
import axios from 'axios'

class Main extends Component {
  // async componentDidMount() {
  //   const res = await axios.post(`${getApiUrl()}/graphql`, {
  //     query: `
  //       query { Users {
  //           first_name
  //       }
  //     }
  //   `
  //   })
  //Users = res.data.data.Users
  // }

  render() {
    let mainView

    if (this.props.activeView === 'events') {
      mainView = <Events />
    } else if (this.props.activeView === 'meets') {
      mainView = <Meets />
    } else if (this.props.activeView === 'profile') {
      mainView = <Profile />
    }
    return <View style={styles.main}>{mainView}</View>
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 11,
    backgroundColor: 'green'
  }
})

const mapStateToProps = state => {
  return {
    activeView: state.activeView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleView: currentView => {
      dispatch({
        type: 'SET_VIEW',
        currentView: currentView
      })
    },
    setAllUsers: allUsers => {
      dispatch({
        type: 'SET_ALL_USERS',
        allUsers: allUsers
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

{
  /* <Button 
    title="Toggle Button" 
    onPress={() => {
        if (this.props.currentView === "events") {
            this.props.toggleView("meets")
        }else if (this.props.currentView === "meets") {
            this.props.toggleView("events")
        }
    }}
/> */
}
