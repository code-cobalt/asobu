import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { getChat, getUserChats } from '../src/actions/chats'
import {
  getUsers,
  getUserLimited,
  getUserEquippedBadges
} from '../src/actions/users'
import Profile from './Profile'
import Results from './Results'
import Inbox from './Inbox'

interface Props {
  activeView: string
  email: string
  toggleView: Function
  setAllUsers: Function
  removeUser: Function
  removeUserChat: Function
  acceptHangoutRequest: Function
  receiveHangoutRequest: Function
  context: Function
  getUsers: Function
  getChat: Function
  socket: WebSocket
  hiddenUsers: string[]
  hangouts: [Hangout]
}

interface Hangout {
  hangout_id: String
  participants: [UserLimited]
}

interface UserLimited {
  first_name: String
  email: String
  profile_photo: String
}

class Main extends Component<Props> {
  componentWillMount() {
    this.props.socket.send(`l0 ${this.props.email}`)
    // comment out socket.send to use dummy data
    this.props.socket.onmessage = async event => {
      console.log(`FROM SERVER: ${event.data}`)
      const message = event.data.split(' ')
      //Heartbeat
      if (message[0] === 'p0') {
        this.props.socket.send(`p0 ${this.props.email}`)
        // comment out socket.send to use dummy data

        console.log('PONGED')
      }
      //Message Update
      if (message[0] === 'm0') {
        console.log('CLIENT RECEIVED MESSAGE')
        this.props.getChat(parseInt(message[1]))
      }
      //Block User
      if (message[0] === 'b0') {
        console.log('CLIENT BLOCKED')
        this.props.removeUser(message[1])
        this.props.removeUserChat(~~message[2])
      }
      //Send Hangout Request
      if (message[0] == 'h0') {
        console.log('CLIENT RECEIVED HANGOUT REQUEST')
        const newUserLimited = await getUserLimited(message[1])
        this.props.receiveHangoutRequest(newUserLimited)
      }
      //Accept Hangout Request
      if (message[0] === 'h1') {
        console.log('CLIENT HANGOUT REQUEST APPROVED')
        const newChatMessages = await getUserChats(this.props.email)
        const newChat = newChatMessages.pop()
        const equipped_badges = await getUserEquippedBadges(
          newChat.participants[0].email
        )
        this.props.acceptHangoutRequest(newChat, equipped_badges)
        Alert.alert(
          `${message[2]} has accepted your hangout request!`,
          'Visit chats to start talking!'
        )
      }
    }
    this.props.getUsers(
      this.props.email,
      this.props.hiddenUsers,
      this.props.hangouts
    )
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
    email: state.user.email,
    hiddenUsers: [
      ...state.blockedUsers,
      ...state.blockedByUsers,
      ...state.user.received_hangout_requests.map(request => request.email),
      ...state.user.accepted_hangouts.map(hangout => {
        if (hangout.email) return hangout.email
      })
    ],
    hangouts: state.ongoingHangouts
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
    updateChat: chat => {
      dispatch({
        type: 'SHOW_CHAT',
        messages: chat
      })
    },
    getChat: chatId => dispatch(getChat(chatId)),
    getUsers: (currentUserEmail, blockedUsers, hangouts) =>
      dispatch(getUsers(currentUserEmail, blockedUsers, hangouts)),
    removeUser: userEmail => {
      dispatch({ type: 'REMOVE_USER', userEmail })
    },
    removeUserChat: chatId => {
      dispatch({ type: 'REMOVE_USER_CHAT', chatId })
    },
    acceptHangoutRequest: (newChat, equippedBadges) => {
      dispatch({ type: 'ACCEPT_REQUEST', newChat, equippedBadges })
    },
    receiveHangoutRequest: userLimited => {
      dispatch({ type: 'RECEIVE_REQUEST', userLimited })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
