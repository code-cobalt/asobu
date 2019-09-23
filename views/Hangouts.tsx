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
  SafeAreaView,
  Switch,
  ActivityIndicator
} from 'react-native'
import UserList from '../components/UserList'
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
import { toggleActive, getUsers } from '../src/actions/users'
import Spinner from '../components/Spinner'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface UserLimitedBadges {
  first_name: string
  email: string
  profile_photo: string
  equipped_badges: string[]
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
  userToReview: UserLimitedBadges
  isReviewing: boolean
  isActive: boolean
  toggleActiveSearch: Function
  longitude: number
  latitude: number
  email: string
  getUsers: Function
  hiddenUsers: string[]
  hangouts: [Hangout]
}

interface Hangout {
  hangout_id: string
  participants: [UserLimited]
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
      this.props.receivedHangoutRequests.length > 0 ? 'pending' : 'accepted',
    active: this.props.isActive
  }

  setUserLocation(bool) {
    const updatedUser = {
      longitude: this.props.longitude,
      latitude: this.props.latitude,
      is_active: bool
    }
    this.setState({ active: bool })
    this.props.toggleActiveSearch(this.props.email, updatedUser)
    if (bool) {
      this.props.getUsers(
        this.props.email,
        this.props.hiddenUsers,
        this.props.hangouts,
        this.props.latitude,
        this.props.longitude
      )
    }
  }

  renderReview = () => {
    if (this.props.userToReview.email) {
      this.props.modalIsClosed()
    }
  }

  render() {
    return (
      <>
        {this.props.allUsers.length > 0 ? (
          <SafeAreaView style={styles.userList}>
            <View>
              <Text style={{ alignSelf: 'flex-end', marginRight: 5 }}>
                You're currently {this.state.active ? 'active' : 'inactive'}
              </Text>
              <Switch
                value={this.state.active}
                onValueChange={bool => this.setUserLocation(bool)}
                thumbColor={'#73d961'}
              />
            </View>
            <UserList />
            <Modal
              isVisible={
                (this.state.modalVisible || this.props.popupModal) &&
                !this.props.isReviewing
              }
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
                <SocketContext.Consumer>
                  {socket => <AcceptedHangouts socket={socket} />}
                </SocketContext.Consumer>
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
        ) : (
          <Spinner />
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  results__switch: {
    marginTop: 10
  },
  userList: {
    marginBottom: 85,
    backgroundColor: '#e5e6e5'
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    userToReview: state.userToReview,
    isReviewing: state.isReviewing,
    isActive: state.isActive,
    email: state.user.email,
    longitude: state.longitude,
    latitude: state.latitude,
    allUsers: state.allUsers,
    hiddenUsers: [
      ...state.blockedUsers,
      ...state.blockedByUsers,
      ...state.user.received_hangout_requests.map(request => request.email),
      ...state.user.accepted_hangouts.map(hangout => {
        if (hangout.email) return hangout.email
      })
    ],
    hangouts: state.ongoingHangouts
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
    },
    toggleActiveSearch: (email, updatedUser) =>
      dispatch(toggleActive(email, updatedUser)),
    getUsers: (currentUserEmail, blockedUsers, hangouts, latitude, longitude) =>
      dispatch(
        getUsers(currentUserEmail, blockedUsers, hangouts, latitude, longitude)
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hangouts)
