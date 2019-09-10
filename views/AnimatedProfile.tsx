import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Badges from '../components/Badges'

const { height, width } = Dimensions.get('window')

interface Props {
  username: string
  showProfile: boolean
  setUserName: Function
  closeProfile: Function
  currentProfile: User
}

interface User {
  first_name: string
  profile_photo: string
  lvl: number
}

export class AnimatedProfile extends Component<Props> {
  componentDidUpdate() {
    if (this.props.showProfile) {
      this.yTranslate.setValue(0)
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start()
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start()
    }
  }

  yTranslate = new Animated.Value(0)

  componentWillUnmount() {
    this.props.closeProfile()
  }

  render() {
    let negativeHeight = -height + 20
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    })
    let translateStyle = { transform: [{ translateY: modalMoveY }] }
    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <View style={styles.container}>
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
            onPress={this.props.closeProfile}
            style={styles.profile__close}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
    justifyContent: 'center'
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
    username: state.username,
    showProfile: state.showProfile,
    currentProfile: state.currentProfile
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
)(AnimatedProfile)
