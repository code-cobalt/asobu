import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { getChat } from '../src/actions/chats'
import { blockUser } from '../src/actions/users'

interface Props {
  chat: Chat
  getChat: Function
  socket: Socket
  currentUserEmail: string
  blockUser: Function
}

interface Socket {
  send: Function
}

interface Chat {
  chat_id: number
  participants: Array<Participant>
}

interface Participant {
  id: string
  email: string
  first_name: string
  profile_photo: string
  equipped_badges: [string]
}

class Chat extends React.Component<Props> {
  confirmBlock = participant => {
    Alert.alert(
      'Are you sure?',
      `If you block ${participant.first_name}, you won't be able to message or hangout with each other.`,
      [
        {
          text: 'Block User',
          onPress: () => {
            this.props.blockUser(
              this.props.currentUserEmail,
              participant.email,
              this.props.chat.chat_id
            )
            this.props.socket.send(
              `b0 ${this.props.currentUserEmail} ${participant.email} ${this.props.chat.chat_id}`
            )
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    )
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.chat}
        onPress={() => this.props.getChat(this.props.chat.chat_id)}
      >
        {this.props.chat.participants.map((participant, index) => {
          return (
            <Image
              source={{ uri: participant.profile_photo }}
              style={styles.chat__image}
              key={index}
            />
          )
        })}
        <View style={styles.chat__textcontainer}>
          {this.props.chat.participants.map(participant => {
            return (
              <View key={participant.email}>
                <Text style={styles.chat__name}>{participant.first_name}</Text>
                <Text
                  style={styles.chat__text}
                  onPress={() => this.confirmBlock(participant)}
                >
                  Block User
                </Text>
              </View>
            )
          })}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  user__badges: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7
  },
  chat: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#adadae',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    shadowColor: '#000',
    elevation: 3
  },
  chat__image: {
    borderRadius: 5,
    height: '100%',
    aspectRatio: 2 / 2
  },
  chat__textcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 50,
    right: 40
  },
  chat__text: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white'
  },
  chat__name: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'flex-start'
  },
  chat__badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 15
  }
})

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChat: chatId => dispatch(getChat(chatId)),
    blockUser: (currentUserEmail, blockedUserEmail, chatId) =>
      dispatch(blockUser(currentUserEmail, blockedUserEmail, chatId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
