import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { postNewEvent } from '../src/actions/userActions'

interface Props {
  createEvent: Function
}

class NewEvent extends React.Component<Props> {
  state = {}

  handleSubmit = async e => {
    e.preventDefault()
    const res = await postNewEvent(this.state)
    if (res.status === 200) {
      this.props.createEvent(res.data.data.CreateEvent)
    }
  }
  render() {
    return ()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: newEvent => {
      return dispatch({ type: 'CREATE_EVENT', newEvent })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewEvent)
