import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Dimensions, Animated, Easing, ScrollView } from "react-native"
import { connect } from "react-redux"
import ChatMessage from "../components/ChatMessage"
import ChatInput from "../components/ChatInput"
import getApiUrl from '../environment.js'
import axios from "axios"

const { height, width } = Dimensions.get("window")

export class AnimatedChat extends Component {

  componentDidUpdate() {
    if (this.props.showChat) {
      this.yTranslate.setValue(0);
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start();
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  yTranslate = new Animated.Value(0)

  submitComment = async (message) => {
    // We need to figure out how to make post requests with GraphQL to make this work
    const newMessage = {
      chat_id: this.props.currentChatId,
      content: message,
      from: {
        first_name: "Lily",
        email: "levans@email.com",
        profile_photo: "https://i.pinimg.com/originals/a6/f4/f0/a6f4f037f9207e4eb4ec5a7cedfd2914.jpg"
      }
    }

    const comment = await axios.post(`${getApiUrl()}/graphql`, {
      query: `
      mutation { CreateMessage(newMessage: "${newMessage}") {
        id
        chat_id
        from
        timestamp
        content
      }
    }`
    })
    console.log(comment)
  }

  render() {
    let negativeHeight = -height
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    })
    let translateStyle = { transform: [{ translateY: modalMoveY }] }
    let messages
    if (this.props.currentChat.length > 0) {
      messages = this.props.currentChat[0].messages.map(message => {
        console.log(message.from.email)
        return <ChatMessage key={message.from.email} message={message} />
      })
    }
    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <ScrollView style={styles.chat__messages}>
          {messages}
        </ScrollView>
        <View>
          <ChatInput submitComment={this.submitComment} />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: (height / 100) * 91.7,
    width: width,
    bottom: -height,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  chat__messages: {
    marginTop: 25
  }
})

const mapStateToProps = state => {
  return {
    showChat: state.showChat,
    currentChat: state.currentChat,
    currentChatId: state.currentChatId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeProfile: () => {
      dispatch({
        type: "CLOSE_PROFILE"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedChat)
