import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { createComment } from '../src/actions/events'

class NewComment extends React.Component {
  render() {
    return (
      <View>
        <TextInput>NewComment</TextInput>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: () => dispatch(createComment)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewComment)
