import React, { Component } from 'react'
import {
  Text,
  View,
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

const PendingHangouts = props => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          Other users would like to hangout with you!
        </Text>
        <ScrollView>
          {props.receivedHangoutRequests.map((request, index) => {
            return (
              <View style={styles.request} key={index}>
                <Image
                  source={{ uri: request.profile_photo }}
                  style={styles.user__image}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <Text style={styles.user__name}>{request.first_name}</Text>
                  <TouchableOpacity
                    onPress={async () => {
                      const newChat = await acceptHangoutRequest(
                        props.currentUserEmail,
                        request.email
                      )
                      props.dispatchHangoutRequest(newChat)
                      setTimeout(
                        () =>
                          props.socket.send(
                            `h1 ${props.currentUserEmail} ${request.email}`
                          ),
                        5000
                      )
                    }}
                    style={styles.accept__button}
                  >
                    <Ionicons name="md-checkmark" size={32} color="white" />
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
  request: {
    flexDirection: 'row',
    margin: 10
  },
  user__image: {
    borderRadius: 50,
    height: 90,
    width: 90
  },
  user__name: {
    color: 'white',
    fontSize: 40,
    marginLeft: 10
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
    dispatchHangoutRequest: newChat => {
      dispatch({ type: 'ACCEPT_REQUEST', newChat })
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
