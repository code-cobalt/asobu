import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
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
  chatPartner: string
}

const ChatModal: React.FunctionComponent<Props> = props => {
  return (
    <Modal
      isVisible={props.showChat}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#dcf9ff"
      coverScreen={true}
      style={{ margin: 0, padding: 0 }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.chat__header}>
          <TouchableOpacity style={styles.back__arrow}>
            <Text style={styles.back} onPress={() => props.goBack()}>
              {'<'}
            </Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', fontSize: 26, color: '#fff' }}>{props.chatPartner}</Text>
          <View>
            <Text style={{ color: '#7e7e83' }}>{props.chatPartner}</Text>
          </View>
        </View>
        {props.currentChatMessages.length > 0 ? (
          <ScrollView 
            style={styles.chat__messages}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true});
            }}>
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
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 16 }}>
              Be the first to send a message!
            </Text>
          </View>
        )}

        <View style={styles.input__container}>
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
  chat__header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#7e7e83',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 5
  },
  input__container: {
    width: '100%',
    height: '10%',
    backgroundColor: '#fff'
  },
  back__arrow: {
    borderRadius: 30
  },
  back: {
    marginLeft: 10,
    fontSize: 30,
    color: '#fff',
  },
  chat__messages: {
    paddingTop: 8,
    paddingBottom: 10,
    height: '100%',
    width: '100%'
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
    currentChatId: state.currentChatId,
    chatPartner: state.chat_partner
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
