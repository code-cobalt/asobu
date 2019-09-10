import React from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Chat from './Chat'

interface Props {
  chats: Array<Chat>
}

interface Chat {
  chat_id: number
  participants: Array<Participant>
}

interface Participant {
  email: string
  first_name: string
  profile_photo: string
}

class ChatList extends React.Component<Props> {
  render() {
    return (
      <ScrollView>
        {this.props.chats &&
          this.props.chats.map(chat => {
            return <Chat key={chat.chat_id} chat={chat} />
          })}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chats
  }
}

export default connect(mapStateToProps)(ChatList)
