import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Badges from './Badges'
import { connect } from 'react-redux'
import { postHangoutRequest } from '../src/actions/users'

interface UserLimited {
  id: string
  email: string
  first_name: string
  profile_photo: string
  exp: number
  lvl: number
  interests: [string]
}
interface Props {
  user: UserLimited
  currentUserEmail: string
  sendRequest: Function
}

class User extends React.Component<Props> {
  handlePress = async () => {
    const resStatus = await postHangoutRequest(
      this.props.currentUserEmail,
      this.props.user.email
    )
    if (resStatus === 200) {
      const toUser = {
        first_name: this.props.user.first_name,
        email: this.props.user.email,
        profile_photo: this.props.user.profile_photo
      }
      this.props.sendRequest(toUser)
    }
  }
  render() {
    return (
      // <TouchableOpacity
      //   style={styles.user}
      //   // onPress={() => props.showProfile(props.user)}
      // >
      <View style={styles.user}>
        {this.props.user.profile_photo !== null && (
          <Image
            source={{ uri: this.props.user.profile_photo }}
            style={styles.user__image}
          />
        )}
        <View style={styles.user__textcontainer}>
          <Text style={styles.user__name}>{this.props.user.first_name}</Text>
          <Text style={styles.user__text}>Level {this.props.user.lvl}</Text>
          <Text style={styles.user__text}>XP: {this.props.user.exp}</Text>
        </View>
        <View style={styles.column}>
          <View style={styles.user__badges}>
            <Badges />
          </View>

          <Text style={styles.hangout} onPress={() => this.handlePress()}>
            Send Hangout Request
          </Text>
        </View>
      </View>
      //</TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: 'black',
    borderRadius: 400
  },
  user__image: {
    borderRadius: 42,
    height: 90,
    width: 90
  },
  user__textcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 50,
    right: 40
  },
  user__name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white'
  },
  user__text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  user__badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 15
  },
  hangout: {
    textDecorationLine: 'underline',
    color: 'white',
    marginRight: 25
  },
  column: {
    flexDirection: 'column'
  }
})

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user.email,
    allUsers: state.allUsers
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
    sendRequest: toUser => {
      dispatch({ type: 'SEND_REQUEST', toUser })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
