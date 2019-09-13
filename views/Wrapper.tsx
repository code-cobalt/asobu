import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Auth from '../components/Auth'
import Application from './Application'
import { sockethost } from '../environment'
import { SocketProvider } from '../components/SocketProvider'

/* const connection = new WebSocket(sockethost) */

interface Props {
  isLoggedIn: boolean
}

class Wrapper extends Component<Props> {
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

export default connect(
  mapStateToProps,
  null
)(Wrapper)
