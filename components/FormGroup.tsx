import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'

class FormGroup extends Component {
  render() {
    return (
      <View style={styles.login__formgroup}>
        <Text style={styles.login__label}>{this.props.title}</Text>
        <TextInput value={this.props.test} ref={input => this.input = input} onChange={e => this.props.handleInputChange(e, this.input)} style={styles.login__input} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  login__formgroup: {
    width: "90%",
  },
  login__label: {
    marginLeft: 15,
    marginBottom: 5,
    color: "#fff"
  },
  login__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    textAlign: "center",
    backgroundColor: "#fff",
    opacity: 0.8
  },
  login__button: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  login__button__text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
})

export default FormGroup
