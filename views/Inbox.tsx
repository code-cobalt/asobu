import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Animated
} from 'react-native'
import ChatList from '../components/ChatList'
import AnimatedChat from './AnimatedChat'
import { getChats } from '../src/actions/users.js/index.js'
import { connect } from 'react-redux'

interface Props {
  userEmail: string
  setChats: Function
}

class Inbox extends Component<Props> {
  // async componentDidMount() {
  //   const chats = await getChats(this.props.userEmail)
  //   this.props.setChats(chats)
  // }

  render() {
    return (
      <View style={styles.events}>
        <ChatList />
        <AnimatedChat />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  events: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => {
  return {
    userEmail: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setChats: chats => {
      dispatch({ type: 'SET_CHATS', chats })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox)
