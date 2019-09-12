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
class Comments extends React.Component<Props> {
  render() {
    return (
      <View>
        {this.props.comments &&
          this.props.comments.length > 0 &&
          this.props.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              currentUserEmail={this.props.currentUserEmail}
            />
          ))}
        <NewComment />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user.email
  }
}

export default connect(mapStateToProps)(Comments)
