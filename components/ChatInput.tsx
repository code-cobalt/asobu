import React, { Component } from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'
import { postMessage } from '../src/actions/userActions'
import { connect } from 'react-redux'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  currentUserLimited: UserLimited
  chatId: number
  createMessage: Function,
  chats: Array<ChatObj>,
  currentChatId: number,
  socket: Socket
}

interface Socket {
  send: Function
}

interface ChatObj {
  chat_id: number,
  participants: Array<Participant>
}

interface Participant {
  email: string,
  first_name: string,
  profile_photo: string
}

class ChatInput extends Component<Props> {
  state = {
    inputText: ''
  }
  handleSubmit = async text => {
    const messageData = {
      chat_id: this.props.chatId,
      content: text.nativeEvent.text,
      from: this.props.currentUserLimited
    }
    this.setState({ inputText: '' })
    const newMessage = await postMessage(messageData)
    this.props.createMessage(newMessage)
    const currentChat = this.props.chats.filter(chat => chat.chat_id === this.props.currentChatId)
    const recipientEmail = currentChat[0].participants[0].email
    /* NOTE TO TJ: I don't know how you prefer to send the chatId with the code 'm0 ${recipientEmail}, but you
      can get the chatId with this.props.currentChatId */
    this.props.socket.send(`m0 ${recipientEmail} ${this.props.currentChatId}`)
  }

  render() {
    return (
      <>
        <TextInput
          style={styles.chat__input}
          onChangeText={text => this.setState({ inputText: text })}
          onSubmitEditing={text => this.handleSubmit(text)}
          value={this.state.inputText}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  chat__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    textAlign: 'center',
    width: '95%',
    alignSelf: 'center'
  }
})

const mapStateToProps = state => {
  return {
    //import currentID here
    currentChatId: state.currentChatId,
    chats: state.chats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessage: message => {
      dispatch({ type: 'CREATE_MESSAGE', message })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInput)
