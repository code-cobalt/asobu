import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { registerUser } from '../src/actions/users'

interface State {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  password: string
  password2: string
  pin: string
}

interface User {
  err: string
}

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  password_hash: null
  interests: string[]
  hobbies: string[]
  exp: number
  lvl: number
  stats: Object
  chats: Array<Object>
  events: Array<Object>
  err: Error
}

interface Error {
  err: string
}

interface Props {
  setUser: Function
  toggleAuth: Function
  registerUser: Function
}

class Signup extends Component<Props, State> {
  state = {
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password2: '',
    pin: ''
  }

  handleSignup = async () => {
    if (this.state.email === '') {
      alert('Please provide an email adress')
      return
    }
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      alert('Please provide a valid email adress')
      return
    }
    if (this.state.first_name === '') {
      alert('Please provide a valid first name')
      return
    }
    if (this.state.last_name === '') {
      alert('Please provide a valid last name')
      return
    }
    if (this.state.phone_number === '') {
      alert('Please provide a phone number')
      return
    }
    if (this.state.password === '') {
      alert('Please provide a password')
      return
    }
    if (this.state.password !== this.state.password2) {
      alert('Passwords do not match. Please enter your passwords again.')
      return
    }
    if (this.state.pin.length < 4) {
      alert('PIN must be at least four digits long.')
      return
    }
    if (/[^0-9]/.test(this.state.pin)) {
      alert('PIN must consist only of digits.')
      return
    }
    const newUser = {
      ...this.state,
      pin: ~~this.state.pin
    }
    delete newUser.password2
    this.props.registerUser(newUser)
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/login.jpg')}
        style={styles.signup}
      >
        <SafeAreaView>
          <ScrollView style={styles.signup__scrollview} centerContent={true}>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>Email</Text>
              <TextInput
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>First Name</Text>
              <TextInput
                value={this.state.first_name}
                onChangeText={text => this.setState({ first_name: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>Last Name</Text>
              <TextInput
                value={this.state.last_name}
                onChangeText={text => this.setState({ last_name: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>Phone</Text>
              <TextInput
                value={this.state.phone_number}
                onChangeText={text => this.setState({ phone_number: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>Password</Text>
              <TextInput
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>Repeat Password</Text>
              <TextInput
                value={this.state.password2}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password2: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.signup__formgroup}>
              <Text style={styles.signup__label}>PIN</Text>
              <TextInput
                value={this.state.pin}
                secureTextEntry={true}
                onChangeText={text => this.setState({ pin: text })}
                style={styles.signup__input}
              />
            </View>
            <View style={styles.buttons__formgroup}>
              <TouchableOpacity
                onPress={() => this.handleSignup()}
                style={styles.signup__button}
              >
                <Text style={styles.signup__button__text}>Submit!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.toggleAuth()}
                style={styles.signup__button}
              >
                <Text style={styles.signup__button__text}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  signup__scrollview: {
    width: '100%'
  },
  signup__formgroup: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30
  },
  buttons__formgroup: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  signup__label: {
    marginLeft: 15,
    marginBottom: 5,
    color: '#fff',
    fontWeight: '900'
  },
  signup__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
    opacity: 0.8
  },
  signup__button: {
    width: 180,
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  signup__button__text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  signup__login: {
    color: '#fff',
    position: 'relative',
    top: 30,
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
    },
    registerUser: newUser => dispatch(registerUser(newUser))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Signup)
