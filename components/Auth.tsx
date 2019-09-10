import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Login from '../views/Login'
import Signup from '../views/Signup'

interface Props {
  showLogin: boolean
}

class Auth extends Component<Props> {
  render() {
    return <>{this.props.showLogin ? <Login /> : <Signup />}</>
  }
}

const mapStateToProps = state => {
  return {
    showLogin: state.showLogin
  }
}

export default connect(mapStateToProps)(Auth)
