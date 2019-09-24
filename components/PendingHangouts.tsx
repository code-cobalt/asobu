import React, { Component } from 'react'
import {
  Text,
  View,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import {
  acceptHangoutRequest,
  declineHangoutRequest
} from '../src/actions/hangouts'
import Badges from './Badges'

const PendingHangouts = props => {
  return (
    <>
      <View style={{ flex: 1 }}>
        {props.receivedHangoutRequests.length > 0 ? (
          <>
            <Text style={styles.title}>
              Other users would like to hangout with you!
            </Text>
            <ScrollView style={styles.request}>
              {props.receivedHangoutRequests.map((request, index) => {
                return (
                  <View style={{ marginBottom: 55 }} key={index}>
                    <Image
                      source={{ uri: request.profile_photo }}
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
                        {request.first_name}
                      </Text>
                      <View style={styles.badges}>
                        <Badges badges={request.equipped_badges} />
                      </View>
                      <View style={styles.ionicons}>
                        <TouchableOpacity
                          onPress={async () => {
                            const newChat = await acceptHangoutRequest(
                              props.currentUserEmail,
                              request.email
                            )
                            Alert.alert(
                              `You have accepted ${request.first_name}'s hangout request!`,
                              'Visit chats to start talking!'
                            )
                            props.dispatchHangoutRequest(
                              newChat,
                              request.equipped_badges
                            )
                            setTimeout(
                              () =>
                                props.socket.send(
                                  `h1 ${props.currentUserEmail} ${request.email} ${props.currentUserFirstName}`
                                ),
                              5000
                            )
                          }}
                          style={styles.accept__button}
                        >
                          <Ionicons
                            name="md-checkmark"
                            size={32}
                            color="white"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            props.declineHangoutRequest(
                              props.currentUserEmail,
                              request.email
                            )
                          }
                          style={styles.decline__button}
                        >
                          <Ionicons name="md-close" size={32} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff' }}>
              You have no pending hangout requests
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
    alignItems: 'center',
    marginRight: 15
  },
  decline__button: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  badges: {
    flexDirection: 'row'
  },
  ionicons: {
    flexDirection: 'row',
    marginTop: 15
  },
  close: {
    textAlign: 'right',
    right: 0,
    position: 'absolute',
    bottom: 0
  }
})

const mapStateToProps = state => {
  return {
    receivedHangoutRequests: state.receivedHangoutRequests,
    currentUserEmail: state.user.email,
    currentUserFirstName: state.user.first_name,
    curentUserProfilePhoto: state.user.profile_photo,
    currentProfile: state.currentProfile,
    showProfile: state.showProfile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchHangoutRequest: (newChat, equippedBadges) => {
      dispatch({ type: 'ACCEPT_REQUEST', newChat, equippedBadges })
    },
    declineHangoutRequest: (currentUserEmail, fromUserEmail) =>
      dispatch(declineHangoutRequest(currentUserEmail, fromUserEmail)),
    closeProfile: () => {
      dispatch({ type: 'CLOSE_PROFILE' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingHangouts)
