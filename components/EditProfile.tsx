import React, { Component } from 'react'
import {
  Alert,
  ImageBackground,
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import ModalDropdown from 'react-native-modal-dropdown'
import { updateProfile } from '../src/actions/users'
import { uploadPhoto } from '../src/actions/upload'
import { badges } from './Badges'
const badgeNames = Object.keys(badges)

interface Props {
  showEditProfileForm: boolean
  closeEditProfileForm: Function
  updateProfile: Function
  user: User
  badgeOptions: string[]
}

interface User {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  profile_photo: string
  interests: string[]
  equipped_badges: string[]
}

interface State {
  updatedUser: User
  interestOptions: string[]
  // badgeOptions: string[]
}

class EditProfile extends Component<Props, State> {
  state = {
    updatedUser: {
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      email: this.props.user.email,
      phone_number: this.props.user.phone_number,
      profile_photo: this.props.user.profile_photo,
      interests: this.props.user.interests,
      equipped_badges: this.props.user.equipped_badges
    },
    interestOptions: [
      'soccer',
      'football',
      'sports',
      'baseball',
      'basketball',
      'tennis',
      'running',
      'hiking',
      'reading',
      'dance',
      'clubbing',
      'food',
      'politics',
      'tech',
      'science',
      'religion',
      'travel',
      'foreign-language',
      'gaming',
      'cooking',
      'drawing',
      'music',
      'magic'
    ].filter(option => !this.props.user.interests.includes(option))
  }

  handleUpload = async () => {
    const image = await uploadPhoto()
    this.setState({
      updatedUser: { ...this.state.updatedUser, profile_photo: image }
    })
  }

  addBadge = badge => {
    if (this.state.updatedUser.equipped_badges.length < 3) {
      this.setState({
        updatedUser: {
          ...this.state.updatedUser,
          equipped_badges: [...this.state.updatedUser.equipped_badges, badge]
        }
      })
    } else {
      Alert.alert(
        '3 Equipped Badges Allowed',
        'Click on an equipped badge to remove it and make space for a different one.'
      )
    }
  }

  removeBadge = badge => {
    const badges = this.state.updatedUser.equipped_badges.filter(
      userBadge => userBadge !== badge
    )
    this.setState({
      updatedUser: { ...this.state.updatedUser, equipped_badges: badges }
    })
  }

  addInterest = interest => {
    this.setState({
      updatedUser: {
        ...this.state.updatedUser,
        interests: [...this.state.updatedUser.interests, interest]
      },
      interestOptions: this.state.interestOptions.filter(
        option => option !== interest
      )
    })
  }

  removeInterest = interest => {
    const interests = this.state.updatedUser.interests.filter(
      userInterest => userInterest !== interest
    )
    this.setState({
      updatedUser: { ...this.state.updatedUser, interests },
      interestOptions: [...this.state.interestOptions, interest]
    })
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
            <ScrollView style={{ padding: 20, width: '100%' }} centerContent={true}>
              <View style={styles.profile__formgroup}>
                <Text style={styles.field__text}>First Name</Text>
                <TextInput
                  style={styles.profile__input}
                  value={this.state.updatedUser.first_name}
                  onChangeText={text =>
                    this.setState({
                      updatedUser: {
                        ...this.state.updatedUser,
                        first_name: text
                      }
                    })
                  }
                />
              </View>
              <View style={styles.profile__formgroup}>
                <Text style={styles.field__text}>Last Name</Text>
                <TextInput
                  style={styles.profile__input}
                  value={this.state.updatedUser.last_name}
                  onChangeText={text =>
                    this.setState({
                      updatedUser: {
                        ...this.state.updatedUser,
                        last_name: text
                      }
                    })
                  }
                />
              </View>
              <View style={styles.profile__formgroup}>
                <Text style={styles.field__text}>Email</Text>
                <TextInput
                  style={styles.profile__input}
                  value={this.state.updatedUser.email}
                  onChangeText={text =>
                    this.setState({
                      updatedUser: { ...this.state.updatedUser, email: text }
                    })
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.upload__button}
                onPress={this.handleUpload}
              >
                <Text style={styles.field__text}>Upload a Photo!</Text>
              </TouchableOpacity>
              <Text style={styles.field__text}>Your Interests:</Text>
              {this.state.updatedUser.interests.map(interest => (
                <Text
                  key={interest}
                  style={{ alignSelf: 'center', color: 'white' }}
                >
                  {interest}{' '}
                  <Text onPress={() => this.removeInterest(interest)}>x</Text>
                </Text>
              ))}
              <ModalDropdown
                options={this.state.interestOptions}
                onSelect={(index, value) => this.addInterest(value)}
                style={{ alignSelf: 'center' }}
                textStyle={{ color: 'white' }}
              />
              <Text style={styles.field__text}>Equipped Badges:</Text>
              <View style={styles.top__badges}>
                {this.state.updatedUser.equipped_badges.map(badge => (
                  <TouchableOpacity
                    key={badge}
                    onPress={() => this.removeBadge(badge)}
                  >
                    <Image
                      source={badges[badge]}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                  </TouchableOpacity>
                ))}
                {this.state.updatedUser.equipped_badges.length === 0 && (
                  <>
                    <Image
                      source={require('../assets/socket.png')}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                    <Image
                      source={require('../assets/socket.png')}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                    <Image
                      source={require('../assets/socket.png')}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                  </>
                )}
                {this.state.updatedUser.equipped_badges.length === 1 && (
                  <>
                    <Image
                      source={require('../assets/socket.png')}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                    <Image
                      source={require('../assets/socket.png')}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                  </>
                )}
                {this.state.updatedUser.equipped_badges.length === 2 && (
                  <>
                    <Image
                      source={require('../assets/socket.png')}
                      style={{ margin: 2, height: 40, width: 40 }}
                    />
                  </>
                )}
              </View>
              <View>
                <Text style={styles.field__text}>Add New Equipped Badges:</Text>
                <View style={styles.badge__container}>
                  <View style={styles.badge__category}>
                    {badgeNames.slice(0, 3).map((badge, index) =>
                      this.props.badgeOptions.includes(badge) &&
                      !this.state.updatedUser.equipped_badges.includes(
                        badge
                      ) ? (
                        <TouchableOpacity
                          key={badge}
                          onPress={() => this.addBadge(badge)}
                        >
                          <Image
                            style={styles.ownBadge}
                            source={badges[badge]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          style={styles.noBadge}
                          key={index}
                          source={badges[badge]}
                        />
                      )
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {badgeNames.slice(3, 6).map((badge, index) =>
                      this.props.badgeOptions.includes(badge) &&
                      !this.state.updatedUser.equipped_badges.includes(
                        badge
                      ) ? (
                        <TouchableOpacity
                          key={badge}
                          onPress={() => this.addBadge(badge)}
                        >
                          <Image
                            style={styles.ownBadge}
                            source={badges[badge]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          key={index}
                          style={styles.noBadge}
                          source={badges[badge]}
                        />
                      )
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {badgeNames.slice(6, 9).map((badge, index) =>
                      this.props.badgeOptions.includes(badge) &&
                      !this.state.updatedUser.equipped_badges.includes(
                        badge
                      ) ? (
                        <TouchableOpacity
                          key={badge}
                          onPress={() => this.addBadge(badge)}
                        >
                          <Image
                            style={styles.ownBadge}
                            source={badges[badge]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          key={index}
                          style={styles.noBadge}
                          source={badges[badge]}
                        />
                      )
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {badgeNames.slice(9, 12).map((badge, index) =>
                      this.props.badgeOptions.includes(badge) &&
                      !this.state.updatedUser.equipped_badges.includes(
                        badge
                      ) ? (
                        <TouchableOpacity
                          key={badge}
                          onPress={() => this.addBadge(badge)}
                        >
                          <Image
                            style={styles.ownBadge}
                            source={badges[badge]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          key={index}
                          style={styles.noBadge}
                          source={badges[badge]}
                        />
                      )
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {badgeNames.slice(12, 15).map((badge, index) =>
                      this.props.badgeOptions.includes(badge) &&
                      !this.state.updatedUser.equipped_badges.includes(
                        badge
                      ) ? (
                        <TouchableOpacity
                          key={badge}
                          onPress={() => this.addBadge(badge)}
                        >
                          <Image
                            style={styles.ownBadge}
                            source={badges[badge]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          key={index}
                          style={styles.noBadge}
                          source={badges[badge]}
                        />
                      )
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.button__formgroup}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.updateProfile(
                      this.state.updatedUser.email,
                      this.state.updatedUser
                    )
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
                </View>
            </ScrollView>
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
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  field__text: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '800'
  },
  profile__formgroup: {
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center'
  },
  profile__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 45,
    borderRadius: 5,
    backgroundColor: '#fff',
    textAlign: 'center',
    opacity: 0.8
  },
  button__formgroup: {
    marginBottom: 30
  },
  profile__button: {
    width: '50%',
    backgroundColor: '#73d961',
    padding: 15,
    borderRadius: 50,
    marginTop: 15,
    alignSelf: 'center'
  },
  upload__button: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    alignSelf: 'center'
  },
  profile__button__text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  top__badges: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
    alignSelf: 'center'
  },
  badge__container: {
    flexDirection: 'column',
    marginTop: 25,
    alignItems: 'center',
    backgroundColor: '#bfc0bd',
    paddingTop: 25,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5
  },
  badge__category: {
    flexDirection: 'row',
    marginBottom: 25
  },
  ownBadge: {
    marginRight: 25,
    marginLeft: 25,
    height: 40,
    width: 40
  },
  noBadge: {
    opacity: 0.1,
    marginRight: 25,
    marginLeft: 25,
    height: 40,
    width: 40
  }
})

const mapStateToProps = state => {
  return {
    showEditProfileForm: state.showEditProfileForm,
    user: state.user,
    badgeOptions: state.badgeOptions
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
