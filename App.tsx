import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Profile from "./views/Profile"
import { Provider } from 'react-redux'
import { store } from './src/store'

export default function App() {
  console.log(store)
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Profile/>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})