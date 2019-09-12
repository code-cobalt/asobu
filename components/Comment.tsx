import React from 'react'
import { View, Text } from 'react-native'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface CommentData {
  id: string
  content: string
  timestamp: Date
  from: UserLimited
}

interface Props {
  comment: CommentData
}

export default class Comment extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>{this.props.comment.from.first_name} posted:</Text>
        <Text>{this.props.comment.content}</Text>
        <Text>{this.props.comment.timestamp}</Text>
      </View>
    )
  }
}
