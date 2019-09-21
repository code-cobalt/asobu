import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/store'
import Wrapper from './views/Wrapper'
import SocketProvider from './components/SocketProvider'

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SocketProvider>
          <Wrapper />
        </SocketProvider>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  app__main: {
    flex: 12
  },
  app__navbar: {
    flex: 1
  }
})

export default App
