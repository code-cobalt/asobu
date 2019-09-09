import React, { Component } from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

export class ChatInput extends Component {
  state = {
    textInput: ""
  }

  handleSubmit = text => {
    //text.nativeEvent.text
    this.props.submitComment(text.nativeEvent.text)
  }

  render() {
    return (
      <>
        <TextInput style={styles.chat__input} onChangeText={text => this.setState({ inputText: text })} onSubmitEditing={this.handleSubmit} />
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
    textAlign: "center",
    width: "95%",
    alignSelf: "center"
  },
})

export default ChatInput
