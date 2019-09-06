import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground, AsyncStorage } from 'react-native'
import axios from "axios"
import { connect } from "react-redux"
/* import AsyncStorage from '@react-native-community/async-storage'; */

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

interface Props {
  setUser: Function,
  toggleAuth: Function
}

class Login extends Component<Props, State> {
  state = {
    email: "",
    password: ""
  }

  handleLogin = async () => {
    console.log("Inside")
    const user = await axios.get<ServerData, Error>("http://192.168.10.127:3000/auth", {
      params: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(async (response) => {
      console.log(response)
      try {
        const user = response
        console.log(user)
        if (user.err) {
          console.log(user.err)
        }
        console.log(user)
        await AsyncStorage.setItem("token", JSON.stringify(user))
        this.props.setUser(user)
      } catch (error) {
        console.log(error)
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
        <Text style={styles.login__signup} onPress={this.props.toggleAuth}>Sign Up</Text>
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
    fontWeight: "900",
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
  },
  login__signup: {
    color: "#fff",
    position: "relative",
    top: 50,
    fontSize: 16
  }
})

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        user
      })
    },
    toggleAuth: () => {
      dispatch({
        type: "TOGGLE_AUTH",
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
