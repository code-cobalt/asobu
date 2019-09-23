import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import User from '../components/User'
import { SocketContext } from './SocketProvider'
import Modal from 'react-native-modal'

const AttendeesModal = props => {
  const unTrigger = () => {
    props.untriggerAttendees()
    props.showEvent()
  }

  let attendeesList
  if (
    props.currentEvent.attendees !== undefined &&
    props.currentEvent.attendees.length > 0
  ) {
    attendeesList = props.currentEvent.attendees.map(attendee => {
      return (
        <SocketContext.Consumer key={attendee.email}>
          {socket => <User user={attendee} socket={socket} />}
        </SocketContext.Consumer>
      )
    })
  }

  return (
    <>
      <Modal
        isVisible={props.showAttendees}
        onModalHide={unTrigger}
        animationIn="lightSpeedIn"
        animationOut="lightSpeedOut"
        backdropOpacity={1}
        backdropColor="#e5e6e5"
        hasBackdrop={true}
        coverScreen={true}
      >
        <View style={styles.button__container}>
          <TouchableOpacity
            style={styles.close__button}
            onPress={props.closeAttendees}
          >
            <Text style={styles.button__text}>Close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.users}>{attendeesList}</ScrollView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button__container: {
    alignItems: 'center',
    padding: 5
  },
  close__button: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  button__text: {
    fontWeight: '800',
    color: 'white'
  },
  users: {
    marginBottom: 10,
    height: '100%',
    width: '100%'
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
    fontWeight: '800'
  },
  user__image: {
    borderRadius: 5,
    height: '100%',
    aspectRatio: 2 / 2
  },
  user__textcontainer: {
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  user__name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5
  },
  user__text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  },
  user__badges: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7
  },
  hangout__text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '900'
  },
  hangout__request: {
    marginTop: 10,
    backgroundColor: '#73d961',
    height: '100%',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    bottom: 5,
    width: '15%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column'
  },
  requested__text: {
    position: 'relative',
    bottom: 80,
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 14,
    color: '#73d961'
  }
})

const mapStateToProps = state => {
  return {
    showAttendees: state.showAttendees,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeAttendees: () => {
      dispatch({
        type: 'CLOSE_ATTENDEES'
      })
    },
    showEvent: () => {
      dispatch({
        type: 'SHOW_EVENT'
      })
    },
    untriggerAttendees: () =>
      dispatch({
        type: 'UNTRIGGER_ATTENDEES'
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesModal)
