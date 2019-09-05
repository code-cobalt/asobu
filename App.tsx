import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { store } from './src/store'
import Main from "./views/Main"
import Navbar from "./components/Navbar"
import Login from "./views/Login"
import SignUp from "./views/Signup"
import Axios from 'axios'

export default class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Main />
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
/*
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(App) */