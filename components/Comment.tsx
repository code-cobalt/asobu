import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { deleteComment } from '../src/actions/events'
import moment from 'moment'

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
    <View style={styles.comment__container}>
      {props.currentUserEmail === props.comment.from.email && (
        <TouchableOpacity
          onPress={() => props.deleteComment(props.eventId, props.comment.id)}
        >
          <Text style={{ textAlign: 'right', fontWeight: '900' }}>Delete</Text>
        </TouchableOpacity>
      )}
      <View style={styles.comment__box}>
        <Image
          style={styles.comment__photo}
          source={{ uri: props.comment.from.profile_photo }}
        />
        <View style={styles.text__container}>
          <Text style={styles.comment__text}>{props.comment.content}</Text>
        </View>
      </View>
      <Text>{moment(props.comment.timestamp).format('LLL')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  comment__box: {
    flexDirection: 'row'
  },
  text__container: {
    width: '70%',
    flexDirection: 'row',
    padding: 10
  },
  comment__text: {
    fontWeight: '500',
    marginLeft: 15
  },
  comment__container: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 5,
    margin: 15,
    borderColor: 'grey',
    borderWidth: 0.5
  },
  comment__photo: {
    height: 60,
    aspectRatio: 1 / 1,
    marginBottom: 10,
    borderRadius: 30
  }
})

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
