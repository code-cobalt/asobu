import React from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { createEvent } from '../src/actions/events'

interface Props {
  dispatchEvent: Function
}

interface State {
  name: string
  location: string
  description: string
  // cover_photo: string
  // limit: number
  // start: Date
  // end: Date
  // tags: Array<string>
}

class NewEvent extends React.Component<Props, State> {
  state = {
    name: '',
    location: '',
    description: ''
  }
  handleSubmit = async e => {
    e.preventDefault()
    const res = await createEvent(this.state)
    if (res.status === 200) {
      this.props.dispatchEvent(res.data.data.CreateEvent)
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.newEvent}>
        <View style={styles.text__formgroup}>
          <Text style={styles.input__text}>Name your Event!</Text>
          <TextInput
            style={styles.event__input}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
          <Text style={styles.input__text}>Set a Location!</Text>
          <TextInput
            style={styles.event__input}
            value={this.state.location}
            onChangeText={text => this.setState({ location: text })}
          />
          <Text style={styles.input__text}>Tell us about it!</Text>
          <TextInput
            style={styles.event__input}
            value={this.state.description}
            onChangeText={text => this.setState({ description: text })}
          />
          <Text>Attendee Limit</Text>
          <Text>Start</Text>
          <Text>End</Text>
          <Text>Tags</Text>
        </View>
        <View>
          <Text>Upload a cover photo for your Event!</Text>
        </View>
        <View>
          <Text>Set a start and end time for your event.</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text__formgroup: {
    width: '90%'
  },
  newEvent: {
    marginTop: 60,
    alignItems: 'center'
  },
  event__input: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 30,
    textAlign: 'center'
  },
  input__text: {
    alignSelf: 'center',
    fontWeight: '700'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: newEvent => {
      return dispatch({ type: 'CREATE_EVENT', newEvent })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewEvent)
