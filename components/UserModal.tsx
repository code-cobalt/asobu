import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import Badges from "./Badges"

interface Props {
  showProfile: boolean
  currentProfile: CurrentProfile
  closeProfile: Function
}

interface CurrentProfile {
  profile_photo: string,
  lvl: string,
  first_name: string
}

const UserModal: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Modal
        isVisible={props.showProfile}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={1}
        style={styles.modal}
        backdropColor="#fff"
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text>Level {props.currentProfile.lvl}</Text>
            <Image
              source={{ uri: props.currentProfile.profile_photo }}
              style={styles.profile__photo}
            />
          </View>
          <View>
            <Text>{props.currentProfile.first_name}</Text>
          </View>
          <View>
            <Text>Equipped Badges</Text>
            <View style={styles.profile__badges}>
              <Badges />
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
              <Badges />
            </View>
          </View>
          <TouchableOpacity
            onPress={props.closeProfile}
            style={styles.profile__close}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  modal: {
    height: '50%',
    textAlign: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)
