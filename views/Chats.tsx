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
import axios from 'axios'
import { getApiUrl } from '../environment.js'
import { connect } from 'react-redux'

interface Props {
  getChats: Function
}

export class Chats extends Component<Props> {
  async componentDidMount() {
    const res = await axios.post(`${getApiUrl()}/graphql`, {
      query: `
        query { User(userEmail: "levans@email.com") {
          email
          chats {
            chat_id
            participants {
              first_name
              email
              profile_photo
            }
          }
        }
      }
      `
    })
    this.props.getChats(res.data.data.User.chats)
  }

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

const mapDispatchToProps = dispatch => {
  return {
    getChats: chats => {
      dispatch({
        type: 'GET_CHATS',
        chats
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Chats)
