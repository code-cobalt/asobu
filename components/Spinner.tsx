import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const Spinner = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#73d961" />
    </View>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Spinner
