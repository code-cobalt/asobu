import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import User from '../components/User'
import { SocketContext } from './SocketProvider'
import Badges from './Badges'

const UserList = props => {
  const sentHangoutRequestEmails = props.sentHangoutRequests.map(
    userLimited => userLimited.email
  )
  const userList = props.allUsers.map(user => {
    if (sentHangoutRequestEmails.includes(user.email)) {
      return (
        <React.Fragment key={user.email}>
          <TouchableOpacity
            style={styles.user__faded}
            onPress={() => props.showProfile(user)}
          >
            {user.profile_photo !== null && (
              <Image
                source={{ uri: user.profile_photo }}
                style={styles.user__image}
              />
            )}

            <View style={styles.user__textcontainer}>
              <Text style={styles.user__name}>{user.first_name}</Text>
              <Text style={styles.user__text}>Level {user.lvl}</Text>
            </View>
            <View style={styles.user__badges}>
              <Badges badges={user.equipped_badges} />
            </View>
            <TouchableOpacity style={styles.hangout__request}>
              <Text style={styles.hangout__text}>Hang!</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.requested__text}>
            You asked {user.first_name} to hang out!
          </Text>
        </React.Fragment>
      )
    } else if (props.isActive) {
      return (
        <SocketContext.Consumer key={user.email}>
          {socket => <User user={user} socket={socket} />}
        </SocketContext.Consumer>
      )
    }
  })
  return <ScrollView style={styles.users}>{userList}</ScrollView>
}

const styles = StyleSheet.create({
  user__faded: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: '#000',
    opacity: 0.1
  },
  users: {
    marginBottom: 10,
    height: '100%',
    width: '100%',
    backgroundColor: '#e5e6e5'
  },
  text__box: {
    backgroundColor: '#bcd634',
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: '800'
  },
  user__image: {
    borderRadius: 5,
    height: '100%',
    aspectRatio: 2 / 2
  },
  user__textcontainer: {
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  user__name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5
  },
  user__text: {
    fontSize: 14,
    fontWeight: '600',
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
    alignContent: 'center',
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column'
  },
  requested__text: {
    position: 'relative',
    bottom: 80,
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 14,
    color: '#73d961'
  }
})

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers,
    sentHangoutRequests: state.sentHangoutRequests,
    isActive: state.isActive
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showProfile: profile => {
      dispatch({
        type: 'SHOW_PROFILE',
        profile
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
