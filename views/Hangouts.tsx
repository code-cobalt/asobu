import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch
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
import AnimatedLoader from 'react-native-animated-loader'

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
  isLoadingUsers: string
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
  id: string
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
    active: this.props.isActive,
    visible: false
  }

  renderAnimation() {
    this.setState({ visible: true })
    setTimeout(() => {
      this.setState({ visible: false })
      this.setUserLocation(true)
    }, 2000)
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
        {!this.props.isLoadingUsers ? (
          <SafeAreaView style={styles.userList}>
            <View>
              <AnimatedLoader
                visible={this.state.visible}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={styles.animation}
                speed={1}
                loop={true}
              />
              {this.state.active && (
                <Switch
                  style={{ margin: 5 }}
                  value={this.state.active}
                  onValueChange={bool => this.setUserLocation(bool)}
                  thumbColor={'#fff'}
                />
              )}
            </View>
            {!this.state.active && (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {!this.state.visible && (
                  <>
                  <TouchableOpacity
                    style={styles.animation__button}
                    onPress={() => this.renderAnimation()}
                  >
                    <Text style={styles.animation__button__text}>Asobu</Text>
                  </TouchableOpacity>
                  <Text style={{color: 'grey'}}>Tap 'Asobu' to join other users near you!</Text>
                  </>
                )}
              </View>
            )}

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
  animation__button__text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 44,
    fontWeight: '900'
  },
  animation__button: {
    width: 300,
    height: 300,
    backgroundColor: '#ff4d4d',
    bottom: 40,
    borderRadius: 155,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: '#000'
  },
  animation: {
    width: 300,
    height: 300
  },
  results__switch: {
    marginTop: 10
  },
  userList: {
    height: '100%',
    width: '100%',
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
    isLoadingUsers: state.isLoadingUsers,
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
