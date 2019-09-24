import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import Badges from './Badges'
import { Divider } from 'react-native-elements'

interface Props {
  showProfile: boolean
  currentProfile: CurrentProfile
  closeProfile: Function
}

interface CurrentProfile {
  profile_photo: string
  lvl: string
  first_name: string
  interests: [string]
  equipped_badges: string[]
}

const UserModal: React.FunctionComponent<Props> = props => {
  return (
    <>
      <Modal
        isVisible={props.showProfile}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={1}
        style={styles.modal}
        backdropColor="#e5e6e5"
      >
        <ScrollView>
          <View style={styles.profile__header}>
            <TouchableOpacity style={styles.photo_container}>
              <Image
                source={{ uri: props.currentProfile.profile_photo }}
                style={styles.user__image}
              />
            </TouchableOpacity>
            <View style={styles.basic_info_container}>
              <Text style={styles.user__name}>
                {props.currentProfile.first_name}
              </Text>
              <Text style={styles.user__level}>
                Level {props.currentProfile.lvl}
              </Text>
              <View style={styles.top__badges}>
                <Badges badges={props.currentProfile.equipped_badges} />
              </View>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.profile__body}>
            <Text style={styles.info__title}>
              {props.currentProfile.first_name}'s Interests
            </Text>
            <Divider style={styles.divider} />
            {props.currentProfile.interests &&
              props.currentProfile.interests.length > 0 && (
                <Text style={styles.info__title}>
                  {props.currentProfile.interests.join(', ')}
                </Text>
              )}
          </View>
          <TouchableOpacity
            onPress={() => props.closeProfile()}
            style={styles.profile__close}
          >
            <Text style={styles.button__text}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {},
  button__text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  profile__header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e5e6e5'
  },
  profile__body: {
    padding: 25,
    flexDirection: 'column',
    backgroundColor: '#e5e6e5'
  },
  photo_container: {
    marginTop: 20,
    height: 255,
    width: 255,
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center'
  },
  basic_info_container: {
    marginLeft: 10,
    alignItems: 'center',
    padding: 25
  },
  user__image: {
    borderRadius: 125,
    height: 250,
    width: 250
  },
  user__name: {
    fontSize: 28,
    fontWeight: '800'
  },
  user__level: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  user__xp: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5
  },
  info__title: {
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: '800'
  },
  interests__container: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 10
  },
  interests__text: {},
  email__phone: {
    marginTop: 25,
    marginBottom: 25,
    left: 15
  },
  inner__text: {
    margin: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  divider: {
    backgroundColor: '#acbdac',
    height: 1.5
  },
  top__badges: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5
  },
  all__badges: {
    flexDirection: 'column',
    marginTop: 25
  },
  badge__container: {
    flexDirection: 'row',
    marginTop: 25
  },
  button__container: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 25
  },
  profile__photo: {
    height: 50,
    width: 50
  },
  profile__close: {
    alignItems: 'center',
    alignSelf: 'center',
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
    currentProfile: state.currentProfile,
    showProfile: state.showProfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
)(UserModal)
