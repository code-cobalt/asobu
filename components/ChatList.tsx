import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import Chat from './Chat'
import { SocketContext } from './SocketProvider'

interface Props {
  chats: Array<Chat>
}

interface Chat {
  chat_id: number
  participants: Array<UserLimited>
}

interface UserLimited {
  email: string
  first_name: string
  profile_photo: string
}

const ChatList: React.FunctionComponent<Props> = props => {
  return (
    <>
      {props.chats.length > 0 ? (
        <ScrollView style={styles.chat_list}>
          {props.chats &&
            props.chats.map(chat => {
              return (
                <SocketContext.Consumer key={chat.participants[0].email}>
                  {socket => <Chat chat={chat} socket={socket} />}
                </SocketContext.Consumer>
              )
            })}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>You have no active chats</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  chat_list: {
    marginTop: 40
  }
})

const mapStateToProps = state => {
  return {
    chats: state.chats
  }
}

export default connect(mapStateToProps)(ChatList)
