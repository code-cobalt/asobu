import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import { SocketContext } from '../components/SocketProvider'
import Modal from 'react-native-modal'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Message {
  id: string
  content: string
  timestamp: Date
  from: UserLimited
}

interface Props {
  showChat: boolean
  currentChatMessages: Array<Message>
  currentChatId: number
  currentUserLimited: UserLimited
  goBack: Function
}

const ChatModal: React.FunctionComponent<Props> = props => {
  return (
    <Modal
      isVisible={props.showChat}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={1}
      backdropColor="#fff"
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.back} onPress={() => props.goBack()}>
          {'<'}
        </Text>
        <ScrollView style={styles.chat__messages}>
          {props.currentChatMessages.length > 0 &&
            props.currentChatMessages.map(message => {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  currentUserLimited={props.currentUserLimited}
                />
              )
            })}
        </ScrollView>

        <View>
          <SocketContext.Consumer>
            {socket => (
              <ChatInput
                currentUserLimited={props.currentUserLimited}
                chatId={props.currentChatId}
                socket={socket}
              />
            )}
          </SocketContext.Consumer>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  back: {
    marginTop: 25,
    marginLeft: 10,
    fontSize: 20
  },
  /* container: {
    position: 'absolute',
    height: (height / 100) * 91.7,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  }, */
  chat__messages: {
    marginTop: 25
  }
})

const mapStateToProps = state => {
  return {
    showChat: state.showChat,
    currentUserLimited: {
      email: state.user.email,
      first_name: state.user.first_name,
      profile_photo: state.user.profile_photo
    },
    currentChatMessages: state.currentChatMessages,
    currentChatId: state.currentChatId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goBack: () => {
      dispatch({
        type: 'CLOSE_CHAT'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatModal)
