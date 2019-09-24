import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'
import { createMessage } from '../src/actions/chats'
import { connect } from 'react-redux'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  currentUserLimited: UserLimited
  chatId: number
  createMessage: Function
  chats: Array<ChatObj>
  currentChatId: number
  socket: Socket
}

interface Socket {
  send: Function
}

interface ChatObj {
  chat_id: number
  participants: Array<Participant>
}

interface Participant {
  email: string
  first_name: string
  profile_photo: string
}

class ChatInput extends Component<Props> {
  state = {
    inputText: ''
  }
  handleSubmit = async text => {
    if (this.state.inputText === '') return alert('Please write a message')
    const messageData = {
      chat_id: this.props.chatId,
      content: text.nativeEvent.text,
      from: this.props.currentUserLimited
    }
    this.setState({ inputText: '' })
    this.props.createMessage(messageData)
    const currentChat = this.props.chats.filter(
      chat => chat.chat_id === this.props.currentChatId
    )
    const recipientEmail = currentChat[0].participants[0].email
    /* NOTE TO TJ: I don't know how you prefer to send the chatId with the code 'm0 ${recipientEmail}, but you
      can get the chatId with this.props.currentChatId */
    this.props.socket.send(`m0 ${recipientEmail} ${this.props.currentChatId}`)
    // Comment out socket.send to use dummy data
  }

  render() {
    return (
      <View style={styles.input__container}>
        <TextInput
          placeholder="Aa"
          style={styles.chat__input}
          onChangeText={text => this.setState({ inputText: text })}
          onSubmitEditing={text => this.handleSubmit(text)}
          value={this.state.inputText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input__container: {
    width: '100%',
    backgroundColor: '#fff'
  },
  chat__input: {
    marginTop: 15,
    height: 40,
    borderColor: '#e5e3ea',
    borderWidth: 2,
    marginBottom: 30,
    borderRadius: 20,
    textAlign: 'center',
    width: '70%',
    alignSelf: 'center',
    backgroundColor: '#efedf5'
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
    createMessage: message => dispatch(createMessage(message))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInput)
