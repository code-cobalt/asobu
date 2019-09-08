import React from 'react'
import { Text, View } from 'react-native'
import { connect } from "react-redux"

const ChatList = props => {
  //loop through props.chat and generate <Chat> for each item in the array
  return (
    <View>
      <Text> This is the ChatList Component </Text>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    chats: state.chats
  }
}

export default connect(mapStateToProps, null)(ChatList)
