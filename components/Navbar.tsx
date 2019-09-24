import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  setActiveView: Function
  activeView: string
  openModal: Function
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
            source={require('../assets/profile_black.png')}
          ></Image>
          <Text style={styles.navbar__text}>Profile</Text>
        </TouchableOpacity>
        {this.props.activeView !== 'results' ? (
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
        ) : (
          <TouchableOpacity
            onPress={() => this.props.openModal()}
            style={styles.navbar__item}
          >
            <Image
              style={styles.navbar__image}
              source={require('../assets/Main.png')}
            ></Image>
            <Text style={styles.navbar__text}>Open List</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.navbar__item}
          onPress={() => this.props.setActiveView('chats')}
        >
          <Image
            style={styles.navbar__image}
            source={require('../assets/chats_black.png')}
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
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: 0.5,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  navbar__item: {
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white',
    borderLeftWidth: 2,
    borderLeftColor: 'white'
  },
  navbar__image: {
    height: 40,
    aspectRatio: 1 / 1
  },
  navbar__text: {
    color: 'black'
  }
})

const mapStateToProps = state => {
  return {
    activeView: state.activeView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveView: view => {
      dispatch({
        type: 'SET_ACTIVE_VIEW',
        activeView: view
      })
    },
    openModal: () => dispatch({ type: 'OPEN_MAIN_MODAL' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
