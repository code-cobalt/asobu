import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Auth from '../components/Auth'
import Application from './Application'
import { sockethost } from '../environment'
import { SocketProvider } from '../components/SocketProvider'
import { loginUser } from '../src/actions/users'

/* const connection = new WebSocket(sockethost) */

interface Props {
  isLoggedIn: boolean
}

class Wrapper extends Component<Props> {
  async componentWillMount() {
    const userStringified = await AsyncStorage.getItem('user')
    if (userStringified !== null) {
      const user = JSON.parse(userStringified)
      this.props.loginUser(user.email, user.password)
    }
  }
  render() {
    return (
      <>
        {this.props.isLoggedIn ? (
          <SocketProvider>
            <Application />
          </SocketProvider>
        ) : (
          <Auth />
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)
