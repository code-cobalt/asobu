import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  AsyncStorage
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { apiUrl } from '../environment.js'
import gql from 'graphql-tag'
import { print } from 'graphql'
/* import AsyncStorage from '@react-native-community/async-storage'; */

interface State {
  email: string
  password: string
}

interface Props {
  setUser: Function
  toggleAuth: Function
}

class Login extends Component<Props, State> {
  state = {
    email: '',
    password: ''
  }

  async handleLogin() {
    const loginQuery = gql`
      query Login($userEmail: String!, $userPassword: String!) {
        Login(userEmail: $userEmail, userPassword: $userPassword) {
          id
          first_name
          last_name
          email
          phone_number
          profile_photo
          interests
          exp
          lvl
          events {
            event_id
            is_creator
          }
          chats {
            chat_id
            participants {
              first_name
              profile_photo
              email
            }
          }
          sent_hangout_requests {
            first_name
            email
            profile_photo
          }
          received_hangout_requests {
            first_name
            email
            profile_photo
          }
          imei
        }
      }
    `

    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(loginQuery),
      variables: {
        userEmail: this.state.email,
        userPassword: this.state.password
      }
    })

    const user = res.data.data.Login

    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.last_name,
        profilePhoto: user.profile_photo
      })
    )
    await this.props.setUser(user)
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/login.jpg')}
        style={styles.login}
      >
        <View style={styles.login__formgroup}>
          <Text style={styles.login__label}>Email</Text>
          <TextInput
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            style={styles.login__input}
          />
        </View>
        <View style={styles.login__formgroup}>
          <Text style={styles.login__label}>Password</Text>
          <TextInput
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            style={styles.login__input}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.handleLogin()}
          style={styles.login__button}
        >
          <Text style={styles.login__button__text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.login__signup} onPress={this.props.toggleAuth}>
          Sign Up
        </Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login__formgroup: {
    width: '90%'
  },
  login__label: {
    marginLeft: 15,
    marginBottom: 5,
    color: '#fff'
  },
  login__input: {
    fontWeight: '900',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
    opacity: 0.8
  },
  login__button: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  login__button__text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  login__signup: {
    color: '#fff',
    position: 'relative',
    top: 50,
    fontSize: 16
  }
})

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch({
        type: 'SET_USER',
        user
      })
    },
    toggleAuth: () => {
      dispatch({
        type: 'TOGGLE_AUTH'
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
