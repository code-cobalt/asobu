import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView
} from 'react-native'
import UserList from '../components/UserList'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import UserModal from '../components/UserModal'
import PendingHangouts from '../components/PendingHangouts'
import AcceptedHangouts from '../components/AcceptedHangouts'
import SwitchSelector from 'react-native-switch-selector'
import Review from '../components/Review'
import {
  acceptHangoutRequest,
  declineHangoutRequest
} from '../src/actions/hangouts'
import { SocketContext } from '../components/SocketProvider'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Profile {
  first_name: string
  profile_photo: string
  email: string
  lvl: number
}

interface Props {
  receivedHangoutRequests: Array<UserLimited>
  acceptedHangouts: Array<UserLimited>
  ongoingHangouts: Array<UserLimited>
  acceptHangoutRequest: Function
  declineHangoutRequest: Function
  currentUserEmail: string
  currentProfile: Profile
  showProfile: boolean
  popupModal: boolean
  closeProfile: Function
  closeMainModal: Function
  modalIsClosed: Function
  userToReview: string
}

const options = [
  { label: 'Pending', value: 'pending' },
  { label: 'Accepted', value: 'accepted' }
]

class Hangouts extends React.Component<Props> {
  state = {
    modalVisible:
      this.props.receivedHangoutRequests.length > 0 ||
      this.props.acceptedHangouts.length > 0 ||
      this.props.ongoingHangouts.length > 0,
    profileVisible: Object.keys(this.props.currentProfile).length > 0,
    visibleHangout:
      this.props.receivedHangoutRequests.length > 0 ? 'pending' : 'accepted'
  }

  renderReview = () => {
    if (this.props.userToReview !== '') {
      this.props.modalIsClosed()
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.userList}>
        <UserList />
        <Modal
          isVisible={this.state.modalVisible || this.props.popupModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.85}
          style={styles.modal}
          onModalHide={() => this.renderReview()}
        >
          <SafeAreaView>
            <SwitchSelector
              options={options}
              backgroundColor="#e5e6e5"
              buttonColor="#73d961"
              initial={this.state.visibleHangout === 'pending' ? 0 : 1}
              onPress={value => this.setState({ visibleHangout: value })}
            />
          </SafeAreaView>
          {this.state.visibleHangout === 'pending' ? (
            <SocketContext.Consumer>
              {socket => <PendingHangouts socket={socket} />}
            </SocketContext.Consumer>
          ) : (
            <AcceptedHangouts />
          )}
          <View>
            <TouchableOpacity
              style={styles.start_button}
              onPress={() => {
                this.setState({ modalVisible: false })
                this.props.closeMainModal()
              }}
            >
              <Text style={styles.button_text}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <UserModal />
        <Review />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  results__switch: {
    top: 40
  },
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
  start_button: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15,
    alignSelf: 'center'
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
    receivedHangoutRequests: state.receivedHangoutRequests,
    currentUserEmail: state.user.email,
    currentProfile: state.currentProfile,
    showProfile: state.showProfile,
    acceptedHangouts: state.acceptedHangouts,
    ongoingHangouts: state.ongoingHangouts,
    popupModal: state.popupModal,
    userToReview: state.userToReview
  }
}
const mapDispatchToProps = dispatch => {
  return {
    acceptHangoutRequest: (currentUserEmail, fromUserEmail) =>
      dispatch(acceptHangoutRequest(currentUserEmail, fromUserEmail)),
    declineHangoutRequest: (currentUserEmail, fromUserEmail) =>
      dispatch(declineHangoutRequest(currentUserEmail, fromUserEmail)),
    closeProfile: () => {
      dispatch({ type: 'CLOSE_PROFILE' })
    },
    closeMainModal: () => {
      dispatch({ type: 'CLOSE_MAIN_MODAL' })
    },
    modalIsClosed: () => {
      dispatch({ type: 'SHOW_REVIEW' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hangouts)
