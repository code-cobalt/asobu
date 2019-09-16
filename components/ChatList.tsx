import React from 'react'
import { ScrollView } from 'react-native'
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
    <ScrollView>
      {props.chats &&
        props.chats.map(chat => {
          return (
            <SocketContext.Consumer>
              {socket => (
                <Chat
                  key={chat.chat_id} chat={chat} socket={socket}
                />
              )}
            </SocketContext.Consumer>
          )
        })}
    </ScrollView>
  )
}

const mapStateToProps = state => {
  return {
    chats: state.chats
  }
}

export default connect(mapStateToProps)(ChatList)
