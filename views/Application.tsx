import React from 'react'
import Main from './Main'
import Navbar from '../components/Navbar'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { SocketContext } from '../components/SocketProvider'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

interface Props {
  email: string
  setSocket: Function
  chat_id: number
  showChat: Function
  initializeSocket: Function
  getLocation: Function
}

class Application extends React.Component<Props> {
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      return Alert.alert('We cannot suggest hangouts without your location')
    }
    const location = await Location.getCurrentPositionAsync({})
    const latitude = location.coords.latitude
    const longitude = location.coords.longitude
    this.props.getLocation(latitude, longitude)
  }

  render() {
    return (
      <>
        <SocketContext.Consumer>
          {context => <Main socket={context} />}
        </SocketContext.Consumer>
        <Navbar />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    connection: state.connection,
    chat_id: state.currentChatId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeSocket: () => {
      dispatch({
        type: 'INITIALIZE_SOCKET'
      })
    },
    getLocation: (latitude, longitude) =>
      dispatch({ type: 'GET_LOCATION', latitude, longitude })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
