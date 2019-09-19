import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { updateProfile } from '../src/actions/users'
import { uploadPhoto } from '../src/actions/upload'

interface Props {
  showEditProfileForm: boolean
  closeEditProfileForm: Function
  updateProfile: Function
  user: User
}

interface User {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  profile_photo: string
  interests: Array<string>
}

interface State {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  profile_photo: string
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
    this.setState({ profile_photo: image })
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
          backdropColor="black"
        >
          <ImageBackground
            style={styles.imageBackground}
            source={require('../assets/login.jpg')}
          >
            <View style={styles.profile__formgroup}>
              <Text style={styles.field__text}>First Name</Text>
              <TextInput
                style={styles.profile__input}
                value={this.state.first_name}
                onChangeText={text => this.setState({ first_name: text })}
              />
            </View>
            <View style={styles.profile__formgroup}>
              <Text style={styles.field__text}>Last Name</Text>
              <TextInput
                style={styles.profile__input}
                value={this.state.last_name}
                onChangeText={text => this.setState({ last_name: text })}
              />
            </View>
            <View style={styles.profile__formgroup}>
              <Text style={styles.field__text}>Email</Text>
              <TextInput
                style={styles.profile__input}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>
            <TouchableOpacity
              style={styles.upload__button}
              onPress={this.handleUpload}
            >
              <Text style={styles.field__text}>Upload a Photo!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.updateProfile(this.state.email, this.state)
              }
              style={styles.profile__button}
            >
              <Text style={styles.profile__button__text}>Submit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => this.props.closeEditProfileForm()}
              style={styles.profile__button}
            >
              <Text style={styles.profile__button__text}>Cancel</Text>
            </TouchableOpacity>
        
          </ImageBackground>
        </Modal>
      </>
    )
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    height: '100%',
    alignItems: 'center'
  },
  field__text: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '800'
  },
  profile__formgroup: {
    width: '90%',
    alignContent: 'center'
  },
  profile__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 45,
    borderRadius: 50,
    backgroundColor: '#fff',
    textAlign: 'center',
    opacity: 0.8
  },
  profile__button: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  upload__button: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 100,
    padding: 15
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
    updateProfile: (userEmail, updatedUser) =>
      dispatch(updateProfile(userEmail, updatedUser)),
    closeEditProfileForm: () => {
      dispatch({ type: 'CLOSE_EDIT_PROFILE_FORM' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)
