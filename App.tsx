import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Main from "./views/Main"
import Navbar from "./components/Navbar"
import Login from "./views/Login"
import SignUp from "./views/Signup"
import Axios from 'axios'

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isLoggedIn ? <Main /> : null}
        {this.props.isLoggedIn ? <Navbar /> : null}
        {!this.props.isLoggedIn ? <Login /> : null}
      </View>
    
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(App)