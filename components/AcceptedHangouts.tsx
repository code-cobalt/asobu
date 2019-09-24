import React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { startHangout, finishHangout } from '../src/actions/hangouts'
import Badges from './Badges'
// import PendingReviews from './PendingReviews'
// future feature: conditional rendering to show PendingReviews component if user hasn't reviewed someone yet

const AcceptedHangouts = props => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Meeting up with</Text>
        {props.acceptedHangouts.length > 0 ? (
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
                    {hangout.equipped_badges && (
                      <View style={styles.badges}>
                        <Badges badges={hangout.equipped_badges} />
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.start_button}
                      onPress={() => {
                        props.socket.send(
                          `s0 ${props.currentUserLimited.email} ${hangout.email} ${props.currentUserLimited.first_name}`
                        )
                        Alert.alert(
                          'Your hangout will begin when the other user confirms.',
                          ''
                        )
                      }}
                    >
                      <Text style={styles.button_text}>Start Hangout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff' }}>
              You have no accepted hangout requests
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Currently hanging out</Text>
        {props.ongoingHangouts.length > 0 ? (
          <ScrollView style={styles.request}>
            {props.ongoingHangouts.map(hangout => (
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
                    onPress={() => {
                      Alert.alert(
                        `Would you like to play an icebreaker activity with ${hangout.participants[0].first_name}?`,
                        `Your game will start when ${hangout.participants[0].first_name} accepts.`
                      ),
                        [
                          {
                            text: 'Nevermind',
                            onPress: () =>
                              console.log('User cancelled playing game.')
                          },
                          {
                            text: "Let's play!",
                            onPress: () =>
                              props.socket.send(
                                `q0 ${props.user.email} ${props.user.first_name} ${hangout.id} ${hangout.participants[0].email}`
                              )
                          }
                        ]
                    }}
                  >
                    <Text style={styles.button_text}>Play a game!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.start_button}
                    onPress={() => {
                      {
                        Alert.alert(
                          `Are you sure you'd like to finish this hangout?`,
                          '',
                          [
                            {
                              text: 'Nevermind',
                              onPress: () =>
                                console.log('User cancelled finish hangout.')
                            },
                            {
                              text: 'Yes',
                              onPress: () => {
                                props.socket.send(
                                  `f1 ${props.user.email} ${hangout.participants[0].email} ${hangout.id}`
                                )
                                props.finishHangout(
                                  hangout.id,
                                  hangout.participants[0]
                                )
                              }
                            }
                          ]
                        )
                      }
                    }}
                  >
                    <Text style={styles.button_text}>Stop Hangout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff' }}>
              You are currently not hanging out with anyone
            </Text>
          </View>
        )}
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
    alignSelf: 'center',
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
    },
    pendingReviews: state.pendingReviews
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
