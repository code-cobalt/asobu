import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getChat, getUserChats, fetchChat } from '../src/actions/chats'
import { getUsers } from '../src/actions/users'
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
  context: Function
  getUsers: Function
  getChat: Function
  socket: WebSocket
  blockedUsers: string[]
}

class Main extends Component<Props> {
  componentDidMount() {
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
        this.props.getChat(parseInt(message[1]))
      }
      //Block User
      if (message[0] === 'b0') {
        this.props.removeUser(message[1])
        this.props.removeUserChat(~~message[2])
      }
      //Accept Hangout Request
      if (message[0] === 'h1') {
        const newChatMessages = await getUserChats(this.props.email)
        this.props.acceptHangoutRequest(newChatMessages.pop())
      }
    }
    this.props.getUsers(this.props.email, this.props.blockedUsers)
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
    blockedUsers: [...state.blockedUsers, ...state.blockedByUsers]
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
    getUsers: (currentUserEmail, blockedUsers) =>
      dispatch(getUsers(currentUserEmail, blockedUsers)),
    removeUser: userEmail => {
      dispatch({ type: 'REMOVE_USER', userEmail })
    },
    removeUserChat: chatId => {
      dispatch({ type: 'REMOVE_USER_CHAT', chatId })
    },
    acceptHangoutRequest: newChat => {
      dispatch({ type: 'ACCEPT_REQUEST', newChat })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
