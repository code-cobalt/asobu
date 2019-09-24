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
          style={[
            props.message.from.email === props.currentUserLimited.email
              ? styles.user__image
              : styles.friend__image
          ]}
        />
      </View>
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <Text style={[
          props.message.from.email === props.currentUserLimited.email
            ? styles.chat__text__user
            : styles.chat__text__friend      
        ]}
        >{props.message.content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  
  user__image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: "flex-end"
  },
  friend__image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: "flex-start"
  },
  chat__user: {
    backgroundColor: '#73d961',
    alignSelf: 'flex-end',
    width: '70%',
    flexDirection: 'row-reverse',
    marginBottom: 15,
    padding: 2,
    borderRadius: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: "#000"
  },
  chat__friend: {
    backgroundColor: '#dee0e9',
    alignSelf: 'flex-start',
    width: '70%',
    flexDirection: 'row',
    marginBottom: 15,
    padding: 2,
    borderRadius: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: "#000"
  },
  chat__text__user: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: '500'
  },
  chat__text__friend: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: '500'
  }
})

export default ChatMessage
