import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { connect } from "react-redux"
import Modal from 'react-native-modal'
import { updateProfile } from '../src/actions/users'
import { uploadPhoto } from "../src/actions/upload"

interface Props {
  showEditProfileForm: boolean,
  updateProfile: Function
  user: User
}

interface User {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  profile_photo: string,
  interests: Array<string>
}

interface State {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  profile_photo: string,
  interests: Array<string>
}

class EditProfile extends Component<Props, State> {
  state = {
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email,
    phone_number: this.props.user.phone_number,
    profile_photo: this.props.user.profile_photo,
    interests: this.props.user.interests
  }

  handleUpload = async () => {
    const image = await uploadPhoto()
    this.setState({ profile_photo: image }, () => console.log(this.state))
  }

  render() {
    return (
      <>
        <Modal
          isVisible={this.props.showEditProfileForm}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          style={styles.modal}
          backdropColor="#fff"
        >
          <View style={styles.profile__formgroup}>
            <Text>First Name</Text>
            <TextInput
              style={styles.profile__input}
              value={this.state.first_name}
              onChangeText={text => this.setState({ first_name: text })}
            />
          </View>
          <View style={styles.profile__formgroup}>
            <Text>Last Name</Text>
            <TextInput
              style={styles.profile__input}
              value={this.state.last_name}
              onChangeText={text => this.setState({ last_name: text })}
            />
          </View>
          <View style={styles.profile__formgroup}>
            <Text>Email</Text>
            <TextInput
              style={styles.profile__input}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={styles.profile__formgroup}>
            <Text>Profile Photo</Text>
            <Button title="Upload Photo" onPress={this.handleUpload} />
          </View>
          <TouchableOpacity
            onPress={() => this.props.updateProfile(this.state.email, this.state)}
            style={styles.profile__button}
          >
            <Text style={styles.profile__button__text}>Done</Text>
          </TouchableOpacity>
        </Modal>
      </>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: '50%',
    alignItems: "center"
  },
  profile__formgroup: {
    width: '90%'
  },
  profile__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  profile__button: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  profile__button__text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

const mapStateToProps = state => {
  return {
    showEditProfileForm: state.showEditProfileForm,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (userEmail, updatedUser) => dispatch(updateProfile(userEmail, updatedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
