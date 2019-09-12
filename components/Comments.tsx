import React from 'react'
import { View } from 'react-native'
import NewComment from './NewComment'
import Comment from './Comment'

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
  comments: Array<CommentData>
}
export default class Comments extends React.Component<Props> {
  render() {
    return (
      <View>
        {this.props.comments &&
          this.props.comments.length > 0 &&
          this.props.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        <NewComment />
      </View>
    )
  }
}
