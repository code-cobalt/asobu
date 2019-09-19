import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Badges from './Badges'
import { connect } from 'react-redux'
import { sendHangoutRequest } from '../src/actions/hangouts'

interface UserLimited {
  id: string
  email: string
  first_name: string
  profile_photo: string
  exp: number
  lvl: number
  interests: string[]
  equipped_badges: string[]
}

interface Socket {
  send: Function
}

interface Props {
  user: UserLimited
  currentUserEmail: string
  sendHangoutRequest: Function
  showProfile: Function
  socket: Socket
}

const User: React.FunctionComponent<Props> = props => {
  return (
    <TouchableOpacity
      key={props.user.email}
      style={styles.user}
      onPress={() => props.showProfile(props.user)}
    >
        {props.user.profile_photo !== null && (
          <Image
            source={{ uri: props.user.profile_photo }}
            style={styles.user__image}
          />
        )}

        <View style={styles.user__textcontainer}>
          <Text style={styles.user__name}>{props.user.first_name}</Text>
          <Text style={styles.user__text}>Level {props.user.lvl}</Text>
        </View>
          <View style={styles.user__badges}>
            <Badges badges={props.user.equipped_badges} />
          </View>
          <TouchableOpacity
            style={styles.hangout__request}
            onPress={() => {
              props.sendHangoutRequest(props.currentUserEmail, {
                first_name: props.user.first_name,
                email: props.user.email,
                profile_photo: props.user.profile_photo,
                equipped_badges: props.user.equipped_badges
              })
              props.socket.send(
                `h0 ${props.currentUserEmail} ${props.user.email}`
              )
            }}
          >
            <Text style={styles.hangout__text}>Hang!</Text>
          </TouchableOpacity>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
  user: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#adadae',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5, 
    borderRadius: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: "#000",
    elevation: 3
  },
  user__image: {
    borderRadius: 5,
    height: '100%',
    aspectRatio: 2/2
  },
  user__textcontainer: {
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  user__name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5
  },
  user__text: {
    fontSize: 14,
    fontWeight: "600",
    color: 'white'
  },
  user__badges: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7
  },
  hangout__text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '900'
  },
  hangout__request: {
    marginTop: 10,
    backgroundColor: '#73d961',
    height: '100%',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    bottom: 5,
    width: '15%',
    alignContent: "center",
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column'
  }
  
})

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user.email,
    allUsers: state.allUsers,
    sentHangoutRequests: state.sentHangoutRequests
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showProfile: profile => {
      dispatch({
        type: 'SHOW_PROFILE',
        profile
      })
    },
    sendHangoutRequest: (currentUserEmail, toUser) =>
      dispatch(sendHangoutRequest(currentUserEmail, toUser))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
