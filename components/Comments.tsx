import React from 'react'
import { View } from 'react-native'
import NewComment from './NewComment'
import Comment from './Comment'
import { connect } from 'react-redux'

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
  currentUserEmail: string
}

const Comments: React.FunctionComponent<Props> = props => {
  /* let commentsArray;
  if (props.comments !== undefined) {
    commentsArray = props.comments.map(comment => {
      <Comment
            key={comment.id}
            comment={comment}
            currentUserEmail={props.currentUserEmail}
          />
    })
  } */
  return (
    <View>
      {props.comments &&
        props.comments.length > 0 &&
        props.comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUserEmail={props.currentUserEmail}
          />
        ))}
      <NewComment />
    </View>
  )
}

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user.email
  }
}

export default connect(mapStateToProps)(Comments)
