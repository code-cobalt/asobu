import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const ChatMessage = props => {
  return (
    <View
      style={[
        props.message.from.email === props.currentUserLimited.email
          ? styles.chat__user
          : styles.chat__friend
      ]}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: props.message.from.profile_photo }}
          style={styles.chat__image}
        />
      </View>
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <Text>{props.message.content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  /* chat: {
    width: "70%",
    flexDirection: props.message.from.email,
    marginBottom: 15
  }, */
  chat__image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  chat__user: {
    backgroundColor: '#73d961',
    alignSelf: 'flex-end',
    width: '70%',
    flexDirection: 'row-reverse',
    marginBottom: 15,
    borderRadius: 50,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: "#000",
    padding: 5
  },
  chat__friend: {
    backgroundColor: '#dee0e9',
    alignSelf: 'flex-start',
    width: '70%',
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 50,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: "#000"
  }
})

export default ChatMessage
