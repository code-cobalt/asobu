import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { sockethost } from "../environment"

const connection = new WebSocket(sockethost)
connection.onopen = (event) => {
  alert('Socket Connected')
}

export const SocketContext = React.createContext();

export class SocketProvider extends Component {
  render() {
    return (
      <SocketContext.Provider value={connection}>
        {this.props.children}
      </SocketContext.Provider>
    )
  }
}

export default SocketProvider
