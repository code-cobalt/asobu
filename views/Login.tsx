import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { loginUser } from '../src/actions/users'
import { connect } from 'react-redux'

interface State {
  email: string
  password: string
}

interface Props {
  toggleAuth: Function
  loginUser: Function
}

class Login extends Component<Props, State> {
  state = {
    email: '',
    password: ''
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
          onPress={() =>
            this.props.loginUser(this.state.email, this.state.password)
          }
          style={styles.login__button}
        >
          <Text style={styles.login__button__text}>Login</Text>
        </TouchableOpacity>
        <Text
          style={styles.login__signup}
          onPress={() => this.props.toggleAuth()}
        >
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
    borderRadius: 5,
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
    loginUser: (userEmail, userPassword) =>
      dispatch(loginUser(userEmail, userPassword)),
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
