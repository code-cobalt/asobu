import React from 'react'
import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import UserList from '../components/UserList'
import { connect } from 'react-redux'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  receivedHangoutRequests: Array<UserLimited>
  approveRequest: Function
}

class Hangouts extends React.Component<Props> {
  render() {
    return (
      <View style={styles.userList}>
        <UserList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userList: {
    top: 40
  }
})

const mapStateToProps = state => {
  return {
    receivedHangoutRequests: state.receivedHangoutRequests
  }
}
const mapDispatchToProps = dispatch => {
  return {
    approveRequest: () => {
      dispatch({ type: 'ACCEPT_REQUEST' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hangouts)
