import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

interface State {
  email: string
  password: string
}

class Login extends Component<{}, State> {
  state = {
    email: "",
    password: ""
  }

  handleLogin = () => {
    //handle login
  }

  render() {
    return (
      <View style={styles.login}>
        <View style={styles.login__formgroup}>
          <Text style={styles.login__label}>Email</Text>
          <TextInput value={this.state.email} onChangeText={text => this.setState({ email: text })} style={styles.login__input} />
        </View>
        <View style={styles.login__formgroup}>
          <Text style={styles.login__label}>Password</Text>
          <TextInput value={this.state.password} secureTextEntry={true} onChangeText={text => this.setState({ password: text })} style={styles.login__input} />
        </View>
        <TouchableOpacity onPress={this.handleLogin} style={styles.login__button}>
          <Text style={styles.login__button__text}>Login</Text>
        </TouchableOpacity>
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
    marginBottom: 5
  },
  login__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    textAlign: "center"
  },
  login__button: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50
  },
  login__button__text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
})

export default Login
