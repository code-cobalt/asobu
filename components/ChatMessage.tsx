import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const ChatMessage = props => {
  return (
    <View
      style={[
        props.message.from.email === 'levans@email.com'
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
    height: 50,
    width: 50,
    borderRadius: 50
  },
  chat__user: {
    backgroundColor: 'pink',
    alignSelf: 'flex-end',
    width: '70%',
    flexDirection: 'row-reverse',
    marginBottom: 15,
    borderRadius: 50
  },
  chat__friend: {
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    width: '70%',
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 50
  }
})

export default ChatMessage
