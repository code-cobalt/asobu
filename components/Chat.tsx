import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { apiUrl } from '../environment.js'
import axios from 'axios'

interface Props {
  chat: Chat
  showChat: Function
  socket: Socket
}

interface Socket {
  send: Function
}

interface Chat {
  chat_id: number
  participants: Array<Participant>
}

interface Participant {
  email: string
  first_name: string
  profile_photo: string
}

const Chat: React.FunctionComponent<Props> = props => {
  const getChat = async () => {
    const chat = await axios.post(`${apiUrl}/graphql`, {
      query: `
        query { Chats(chatIds: [${props.chat.chat_id}]) {
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
        }
      `
    })
    props.showChat(chat.data.data.Chats.pop().messages, props.chat.chat_id)

  }
  return (
    <TouchableOpacity style={styles.chat} onPress={getChat}>
      {props.chat.participants.map(participant => {
        return (
          <Image
            key={participant.email}
            source={{ uri: participant.profile_photo }}
            style={styles.chat__image}
          ></Image>
        )
      })}
      <View style={styles.chat__textcontainer}>
        {props.chat.participants.map(participant => {
          return (
            <Text key={participant.email} style={styles.chat__text}>
              {participant.first_name}
            </Text>
          )
        })}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: 'black',
    borderRadius: 400
  },
  chat__image: {
    borderRadius: 50,
    height: 90,
    width: 90
  },
  chat__textcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 50,
    right: 40
  },
  chat__text: {
    fontSize: 18,
    color: 'white'
  },
  chat__badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 15
  }
})

const mapStateToProps = state => {
  return {
    socket: state.socket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showChat: (messages, chatId) => {
      dispatch({
        type: 'SHOW_CHAT',
        messages,
        chatId
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
