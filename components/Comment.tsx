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

class Comment extends React.Component<Props> {
  render() {
    return (
      <View>
        {this.props.currentUserEmail === this.props.comment.from.email && (
          <Text
            onPress={() =>
              this.props.deleteComment(
                this.props.eventId,
                this.props.comment.id
              )
            }
          >
            Delete
          </Text>
        )}
        <Text>{this.props.comment.from.first_name} posted:</Text>
        <Text>{this.props.comment.content}</Text>
        <Text>{this.props.comment.timestamp}</Text>
      </View>
    )
  }
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
