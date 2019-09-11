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
  createMessage: Function
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
    console.log(typeof this.props.connection.send)
    console.log(typeof this.props.connection)
    /* this.props.connection.send('m0') */
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
    connection: state.connection
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
