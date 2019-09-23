import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Auth from '../components/Auth'
import Application from './Application'
import { SocketProvider } from '../components/SocketProvider'
import { getUser } from '../src/actions/users'

interface Props {
  isLoggedIn: boolean
  setUser: Function
}

class Wrapper extends Component<Props> {
  async componentWillMount() {
    const userStringified = await AsyncStorage.getItem('user')
    if (userStringified !== null) {
      const user = JSON.parse(userStringified)
      const dbUser = await getUser(user.email)
      if (dbUser.password_hash === user.passwordHash) {
        this.props.setUser(dbUser)
      }
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
          <SocketProvider>
            <Auth />
          </SocketProvider>
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
    setUser: user => {
      dispatch({ type: 'SET_USER', user })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)
