import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { startHangout, finishHangout } from '../src/actions/users'
import Badges from './Badges'

export const AcceptedHangouts = props => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Meeting up with</Text>
        <ScrollView style={styles.request}>
          {props.acceptedHangouts.map((hangout, index) => {
            return (
              <View key={index}>
                <Image
                  source={{ uri: hangout.profile_photo }}
                  style={styles.user__image}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <Text style={styles.user__name}>{hangout.first_name}</Text>
                  <View style={styles.badges}>
                    <Badges badges={hangout.equipped_badges} />
                  </View>
                  <TouchableOpacity
                    style={styles.start_button}
                    onPress={() =>
                      props.startHangout([props.currentUserLimited, hangout])
                    }
                  >
                    <Text style={styles.button_text}>Start Hangout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Currently hanging out</Text>
        <ScrollView style={styles.request}>
          {props.ongoingHangouts.map(hangout => {
            return (
              <View key={hangout.participants[0].email}>
                <Image
                  source={{ uri: hangout.participants[0].profile_photo }}
                  style={styles.user__image}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <Text style={styles.user__name}>
                    {hangout.participants[0].first_name}
                  </Text>
                  <View style={styles.badges}>
                    <Badges badges={hangout.participants[0].equipped_badges} />
                  </View>
                  <TouchableOpacity
                    style={styles.start_button}
                    onPress={() =>
                      props.finishHangout(
                        hangout.hangout_id,
                        hangout.participants[0].email
                      )
                    }
                  >
                    <Text style={styles.button_text}>Stop Hangout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  userList: {
    top: 40
  },
  modal: {
    height: '50%',
    textAlign: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  badges: {
    flexDirection: 'row'
  },
  request: {
    flexDirection: 'column',
    margin: 10
  },
  user__image: {
    alignSelf: 'center',
    borderRadius: 55,
    height: 110,
    width: 110,
    marginBottom: 5
  },
  user__name: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 34,
    marginBottom: 5
  },
  accept__button: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  decline__button: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  close: {
    textAlign: 'right',
    right: 0,
    position: 'absolute',
    bottom: 0
  },
  start_button: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 50,
    padding: 15
  },
  button_text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

const mapStateToProps = state => {
  return {
    user: state.user,
    acceptedHangouts: state.acceptedHangouts,
    ongoingHangouts: state.ongoingHangouts,
    currentUserLimited: {
      first_name: state.user.first_name,
      email: state.user.email,
      profile_photo: state.user.profile_photo,
      equipped_badges: state.user.equipped_badges
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startHangout: participants => dispatch(startHangout(participants)),
    finishHangout: (hangoutId, userToReview) =>
      dispatch(finishHangout(hangoutId, userToReview))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedHangouts)
