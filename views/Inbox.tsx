import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import ChatList from '../components/ChatList'
import AnimatedChat from './AnimatedChat'

export default class Inbox extends Component {
  render() {
    return (
      <View style={styles.events}>
        <ChatList />
        <AnimatedChat socket={this.props.socket} />
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
