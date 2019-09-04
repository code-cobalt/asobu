import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Profile from "./views/Profile"
import Main from "./views/Main"
import Navbar from "./components/Navbar"
import { Provider } from 'react-redux'
import { store } from './src/store'
import Axios from 'axios'

export default class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Main />
          <Navbar />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  app__main: {
    flex: 12,
  },
  app__navbar: {
    flex: 1,
  }
})