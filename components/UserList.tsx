import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import User from '../components/User'

const UserList = props => {
  const sentHangoutRequestEmails = props.sentHangoutRequests.map(
    userLimited => userLimited.email
  )
  const userList = props.allUsers.map(user => {
    if (sentHangoutRequestEmails.includes(user.email)) {
      return (
        <View style={styles.text__box}>
          <Text style={styles.text}>
            Your hangout request with {user.first_name} is pending...
          </Text>
        </View>
      )
    } else {
      return <User key={user.id} user={user} />
    }
  })
  return <ScrollView style={styles.users}>{userList}</ScrollView>
}

const styles = StyleSheet.create({
  users: {
    marginBottom: 90
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
    fontWeight: '800',
  }
})

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers,
    sentHangoutRequests: state.sentHangoutRequests
  }
}

export default connect(mapStateToProps)(UserList)
