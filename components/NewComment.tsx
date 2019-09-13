import React from 'react'
import { View, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { createComment } from '../src/actions/events'

interface Props {
  createComment: Function
  eventId: String
  from: UserLimited
}

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface State {
  content: string
}
class NewComment extends React.Component<Props, State> {
  state = {
    content: ''
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder={'Post new comment...'}
          onChangeText={text => this.setState({ content: text })}
        />

        <Button
          title="Post"
          onPress={() =>
            this.props.createComment(this.props.eventId, {
              from: this.props.from,
              content: this.state.content
            })
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventId: state.currentEvent.id,
    from: {
      first_name: state.user.first_name,
      email: state.user.email,
      profile_photo: state.user.profile_photo
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (eventId, newComment) =>
      dispatch(createComment(eventId, newComment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)
