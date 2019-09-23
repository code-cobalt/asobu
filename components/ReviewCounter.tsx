import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const ReviewCounter = ({ value, onChange, name, label }) => {
  return (
    <>
      <Text style={styles.reviewcounter__label}>{label}</Text>
      <View style={styles.reviewcounter}>
        <TouchableOpacity
          style={styles.reviewcounter__button}
          onPress={() => onChange(name, 'decrement')}
        >
          <Text style={styles.reviewcounter__icon}>-</Text>
        </TouchableOpacity>
        <Text style={styles.reviewcounter__count}>{value}</Text>
        <TouchableOpacity
          style={styles.reviewcounter__button}
          onPress={() => onChange(name, 'increment')}
        >
          <Text style={styles.reviewcounter__icon}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  reviewcounter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1
  },
  reviewcounter__label: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center'
  },
  reviewcounter__count: {
    color: '#fff',
    fontSize: 16
  },
  reviewcounter__icon: {
    color: 'white',
    fontSize: 20
  },
  reviewcounter__button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ReviewCounter
