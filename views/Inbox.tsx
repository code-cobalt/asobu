import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import ChatList from '../components/ChatList'
import ChatModal from '../components/ChatModal'

const Inbox = props => {
  return (
    <View style={styles.events}>
      <ChatList />
      <ChatModal />
    </View>
  )
}

const styles = StyleSheet.create({
  events: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Inbox
