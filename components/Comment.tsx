import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { deleteComment } from '../src/actions/events'

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
  currentUserEmail: string
  deleteComment: Function
  eventId: string
}

const Comment: React.FunctionComponent<Props> = props => {
  return (
    <View>
      {props.currentUserEmail === props.comment.from.email && (
        <Text
          onPress={() => props.deleteComment(props.eventId, props.comment.id)}
        >
          Delete
        </Text>
      )}
      <Text>{props.comment.from.first_name} posted:</Text>
      <Text>{props.comment.content}</Text>
      <Text>{props.comment.timestamp}</Text>
    </View>
  )
}

const mapStateToProps = state => {
  return { eventId: state.currentEvent.id }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (eventId, commentId) =>
      dispatch(deleteComment(eventId, commentId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
