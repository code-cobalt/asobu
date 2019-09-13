import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import UserList from '../components/UserList'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { postHangoutAccept } from '../src/actions/users'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  receivedHangoutRequests: Array<UserLimited>
  acceptRequest: Function
  currentUserEmail: string,
  currentProfile: Object
}

class Hangouts extends React.Component<Props> {
  state = {
    modalVisible: this.props.receivedHangoutRequests.length > 0,
    profileVisible: Object.keys(this.props.currentProfile).length > 0
  }
  handlePress = async fromEmail => {
    const res = await postHangoutAccept(this.props.currentUserEmail, fromEmail)
    if (res.status === 200) {
      this.props.acceptRequest(fromEmail, res.data.data.AcceptHangoutRequest)
    }
  }
  render() {
    return (
      <View style={styles.userList}>
        <UserList />
        <Modal
          isVisible={this.state.modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.85}
          style={styles.modal}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              Other users would like to hangout with you!
            </Text>
            <ScrollView>
              {this.props.receivedHangoutRequests.map((request, index) => {
                return (
                  <View style={styles.request} key={index}>
                    <Image
                      source={{ uri: request.profile_photo }}
                      style={styles.user__image}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                      <Text style={styles.user__name}>{request.first_name}</Text>
                      <TouchableOpacity onPress={() => this.handlePress(request.email)} style={styles.accept__button}>
                        <Ionicons name="md-checkmark" size={32} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log("Decline")} style={styles.decline__button}>
                        <Ionicons name="md-close" size={32} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
            <View>
              <Button
                title="Close"
                onPress={() => this.setState({ modalVisible: false })}
              />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.props.showProfile}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.85}
          style={styles.modal}>
          <View style={{ flex: 1 }}>
            <View>
              <Text>Level {this.props.currentProfile.lvl}</Text>
              <Image
                source={{ uri: this.props.currentProfile.profile_photo }}
                style={styles.profile__photo}
              />
            </View>
            <View>
              <Text>{this.props.currentProfile.first_name}</Text>
            </View>
            <View>
              <Text>Equipped Badges</Text>
              <View style={styles.profile__badges}>
                {/* <Badges /> */}
              </View>
            </View>
            <View>
              <Text>Hobbies</Text>
              <TextInput value={'My hobbies are bla bla bla bla'} />
            </View>
            <View>
              <Text>Interests</Text>
              <TextInput value={'My interest are bla bla bla bla'} />
            </View>
            <View>
              <Text>All Badges</Text>
              <View style={styles.profile__badges}>
                {/* <Badges /> */}
              </View>
            </View>
            <TouchableOpacity
              onPress={this.props.closeProfile}
              style={styles.profile__close}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
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
    margin: 10,
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
    backgroundColor: "green",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  decline__button: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    textAlign: 'right',
    right: 0,
    position: 'absolute',
    bottom: 0
  },
  profile__photo: {
    height: 50,
    width: 50
  },
  profile__close: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  profile__badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    receivedHangoutRequests: state.receivedHangoutRequests,
    currentUserEmail: state.user.email,
    currentProfile: state.currentProfile,
    showProfile: state.showProfile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    acceptRequest: (fromUserEmail, newChat) => {
      dispatch({ type: 'ACCEPT_REQUEST', fromUserEmail, newChat })
    },
    closeProfile: () => {
      dispatch({
        type: 'CLOSE_PROFILE'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hangouts)
