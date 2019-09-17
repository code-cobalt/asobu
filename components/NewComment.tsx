import React from 'react'
import { TouchableOpacity, View, Button, TextInput, Text, StyleSheet } from 'react-native'
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
          style={styles.comment__input}
          placeholder={'Post new comment...'}
          onChangeText={text => this.setState({ content: text })}
        />

        <TouchableOpacity
          style={styles.post__button}
          onPress={() =>
            this.props.createComment(this.props.eventId, {
              from: this.props.from,
              content: this.state.content
            })
          }
        >
          <Text style={styles.button__text}>Post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  post__button: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  button__text: {
    fontWeight: '800',
    color: 'white'
  },
  comment__input: {
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: .5,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    opacity: 0.9
  }
})

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
