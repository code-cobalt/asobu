import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  setActiveView: Function
}

class Navbar extends Component<Props> {
  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbar__item}
          onPress={() => this.props.setActiveView('profile')}
        >
          <Image
            style={styles.navbar__image}
            source={require('../assets/Profile.png')}
          ></Image>
          <Text style={styles.navbar__text}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbar__item}
          onPress={() => this.props.setActiveView('results')}
        >
          <Image
            style={styles.navbar__image}
            source={require('../assets/Main.png')}
          ></Image>
          <Text style={styles.navbar__text}>Hangouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbar__item}
          onPress={() => this.props.setActiveView('chats')}
        >
          <Image
            style={styles.navbar__image}
            source={require('../assets/Chat.png')}
          ></Image>
          <Text style={styles.navbar__text}>Chats</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  navbar__item: {
    alignItems: 'center'
  },
  navbar__image: {
    height: 20,
    width: 20
  },
  navbar__text: {
    color: 'white'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    setActiveView: view => {
      dispatch({
        type: 'SET_ACTIVE_VIEW',
        activeView: view
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Navbar)
