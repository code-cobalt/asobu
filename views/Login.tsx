import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native'
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

interface State {
  email: string
  password: string
}

interface Error {
  err: string
}

interface ServerData {
  email: string,
  first_name: string,
  last_name: string,
  phone: string,
  password_hash: null,
  interests: Array<string>,
  hobbies: Array<string>,
  exp: number,
  lvl: number,
  stats: Object,
  chats: Array<Object>
  events: Array<Object>,
  err: Error
}

interface ServerResponse {
  data: ServerData
}

class Login extends Component<{}, State> {
  state = {
    email: "",
    password: ""
  }

  handleLogin = async () => {
    const user = await axios.get<ServerData, Error>("/auth", {
      params: {
        email: this.state.email,
        password: this.state.password
      }
    })
  }

  render() {
    return (
      <ImageBackground source={require("../assets/login.jpg")} style={styles.login}>
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
      </ImageBackground>
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

export default Login
