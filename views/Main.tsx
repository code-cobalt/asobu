import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../environment.js'
import Profile from './Profile'
import Results from './Results'
import Inbox from './Inbox'

interface Props {
  toggleView: Function
  setAllUsers: Function
  activeView: String
  context: Function
  email: String
}

class Main extends Component<Props> {
  async componentDidMount() {
    this.props.context.send(`l0 ${this.props.email}`)
    this.props.context.onmessage = async event => {
      console.log('INSIDE ON MESSAGE')
      console.log(event.data)
      const m0 = new RegExp(/m0/)
      if (m0.test(event.data)) {
        //query and get chats
        const chat_id = event.data.split(' ')[1]
        console.log('THIS IS CHAT_ID', chat_id)
        const messages = await axios.post(`${apiUrl}/graphql`, {
          query: `{ Chats(chatIds: [${chat_id}]) {
          messages {
            id
            content
            timestamp
            from {
              first_name
              profile_photo
              email
            }
          }
        }
      }`
        })
        /* console.log("This is messages", messages) */
        this.props.updateChat(messages.data.data.Chats[0].messages)
      }
    }
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: `
            query { Users {
                id
                first_name
                email
                profile_photo
                interests
                exp
                lvl
                }
            }
        `
    })
    this.props.setAllUsers(res.data.data.Users)
  }

  render() {
    let mainView

    if (this.props.activeView === 'profile') {
      mainView = <Profile />
    } else if (this.props.activeView === 'results') {
      mainView = <Results />
    } else if (this.props.activeView === 'chats') {
      mainView = <Inbox />
    }
    return <View style={styles.main}>{mainView}</View>
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 11,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => {
  return {
    activeView: state.activeView,
    allUsers: state.allUsers,
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveView: activeView => {
      dispatch({
        type: 'SET_ACTIVE_VIEW',
        activeView: activeView
      })
    },
    setAllUsers: allUsers => {
      dispatch({
        type: 'SET_ALL_USERS',
        allUsers: allUsers
      })
    },
    updateChat: chat => {
      dispatch({
        type: 'SHOW_CHAT',
        messages: chat
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
