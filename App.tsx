import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/store'
import Wrapper from "./views/Wrapper"

export default class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Wrapper />
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