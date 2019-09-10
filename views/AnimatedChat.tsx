import React, { Component } from 'react'
<<<<<<< HEAD
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import gql from 'graphql-tag'
=======
import { View, Text, Image, StyleSheet, TextInput, Dimensions, Animated, Easing, ScrollView } from "react-native"
import { connect } from "react-redux"
import ChatMessage from "../components/ChatMessage"
import ChatInput from "../components/ChatInput"
import { getApiUrl } from '../environment.js'
import { print } from "graphql"
import gql from "graphql-tag"
import axios from "axios"
>>>>>>> 29fb341446b61b2674d4a8f4e9a3486f7d668b32

const { height, width } = Dimensions.get('window')

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Message {
  content: string
  timestamp: Date
  from: UserLimited
}

interface Props {
  showChat: boolean
  currentChatMessages: Array<Message>
  currentChatId: number
  currentUserLimited: UserLimited
  goBack: Function
}

class AnimatedChat extends Component<Props> {
  componentDidUpdate() {
    if (this.props.showChat) {
      this.yTranslate.setValue(0)
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start()
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start()
    }
  }

  yTranslate = new Animated.Value(0)

  submitComment = async message => {
    const messageQuery = gql`
      mutation CreateMessage($NewMessage: NewMessage!) {
        CreateMessage(newMessage: $NewMessage) {
          id
          chat_id
          timestamp
          content
        }
      }
    `
  }

  render() {
    let negativeHeight = -height
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    })
    let translateStyle = { transform: [{ translateY: modalMoveY }] }

    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <Text style={styles.back} onPress={() => this.props.goBack()}>
          {'<'}
        </Text>
        <ScrollView style={styles.chat__messages}>
          {this.props.currentChatMessages.length > 0 &&
            this.props.currentChatMessages.map(message => {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  currentUserLimited={this.props.currentUserLimited}
                />
              )
            })}
        </ScrollView>

        <View>
          <ChatInput
            currentUserLimited={this.props.currentUserLimited}
            chatId={this.props.currentChatId}
          />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    marginTop: 25,
    marginLeft: 10,
    fontSize: 20
  },
  container: {
    position: 'absolute',
    height: (height / 100) * 91.7,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  chat__messages: {
    marginTop: 25
  }
})

const mapStateToProps = state => {
  return {
    showChat: state.showChat,
    currentUserLimited: {
      email: state.user.email,
      first_name: state.user.first_name,
      profile_photo: state.user.profile_photo
    },
    currentChatMessages: state.currentChatMessages,
    currentChatId: state.currentChatId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goBack: () => {
      dispatch({
        type: 'CLOSE_CHAT'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedChat)
