import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { connect } from "react-redux"
import { startHangout } from "../src/actions/users"

export const AcceptedHangouts = props => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          Meeting up with
        </Text>
        <ScrollView>
          {props.acceptedHangouts.map((hangout, index) => {
            return (
              <View style={styles.request} key={index}>
                <Image source={{ uri: hangout.profile_photo }} style={styles.user__image} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={styles.user__name}>{hangout.first_name}</Text>
                  <Button title="Start Hangout" onPress={() => props.startHangout([props.currentUserLimited, hangout])} />
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          Currently hanging out
        </Text>
        <ScrollView>
          {props.ongoingHangouts.map(hangout => {
            return (
              <View style={styles.request} key={hangout.email}>
                <Image source={{ uri: hangout.profile_photo }} style={styles.user__image} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={styles.user__name}>{hangout.first_name}</Text>
                  <Button title="Start Hangout" onPress={() => console.log("Stop hangout")} />
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
  },
})

const mapStateToProps = state => {
  return {
    acceptedHangouts: state.acceptedHangouts,
    ongoingHangouts: state.ongoingHangouts,
    currentUserLimited: {
      first_name: state.user.first_name,
      email: state.user.email,
      profile_photo: state.user.profile_photo
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startHangout: (participants) => dispatch(startHangout(participants))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedHangouts)