import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native'

import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import Badges from './../components/Badges'
import EditProfile from '../components/EditProfile'
import { logOut } from '../src/actions/users'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Event {
  event_id: string
  is_creator: boolean
}

interface Stats {
  kind: number
  interesting: number
  fun: number
  funny: number
  therapeutic: number
  intellectual: number
}

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  profile_photo: string
  interests: string[]
  exp: number
  lvl: number
  events: Array<Event>
  sent_hangout_requests: Array<UserLimited>
  received_hangout_requests: Array<UserLimited>
  equipped_badges: string[]
  imei: string
  stats: Stats
}

interface Props {
  user: User
  editProfile: Function
  toggleActiveSearch: Function
  logOut: Function
}

class Profile extends Component<Props> {
  render() {
    return (
      <View style={styles.parent__container}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.profile__header}>
              <TouchableOpacity style={styles.photo_container}>
                {this.props.user.profile_photo !== null && (
                  <Image
                    source={{ uri: this.props.user.profile_photo }}
                    style={styles.user__image}
                  />
                )}
                {this.props.user.profile_photo === null && (
                  <Image
                    source={require('../assets/default_profile.png')}
                    style={styles.user__image}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.edit__button}
                onPress={() => this.props.editProfile()}
              >
                <Text style={styles.button__text}>Edit Profile</Text>
              </TouchableOpacity>
              <View style={styles.basic_info_container}>
                <Text style={styles.user__name}>
                  {this.props.user.first_name} {this.props.user.last_name}
                </Text>
                <Text style={styles.user__level}>
                  Level {this.props.user.lvl}
                </Text>
                <Text style={styles.user__xp}>XP {this.props.user.exp}</Text>
                <View style={styles.top__badges}>
                  <Badges badges={this.props.user.equipped_badges} />
                </View>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.profile__body}>
              <Text style={styles.info__title}>Your Interests</Text>
              <View style={styles.interests__container}>
                {this.props.user.interests.length > 0 &&
                  this.props.user.interests.map(interest => {
                    return (
                      <Text style={styles.interests__text}>{interest}</Text>
                    )
                  })}
              </View>
              <View style={styles.email__phone}>
                <Text style={styles.info__title}>email</Text>
                <Text style={styles.inner__text}>{this.props.user.email}</Text>
                <Text style={styles.info__title}>Phone #</Text>
                <Text style={styles.inner__text}>
                  {this.props.user.phone_number}
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.all__badges}>
                <Text style={styles.info__title}>Your Badges</Text>
                <View style={styles.badge__container}>
                  <View style={styles.badge__category}>
                    <Image
                      style={styles.noBadge}
                      source={require('../assets/crown_badge.png')}
                    />
                    <Image
                      style={styles.noBadge}
                      source={require('../assets/crown_badge2.png')}
                    />
                    <Image
                      style={styles.noBadge}
                      source={require('../assets/crown_badge3.png')}
                    />
                  </View>
                  <View style={styles.badge__category}>
                    {this.props.user.stats.kind >= 1 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/kind_bronze.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/kind_bronze.png')}
                      />
                    )}
                    {this.props.user.stats.kind >= 5 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/kind_silver.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/kind_silver.png')}
                      />
                    )}
                    {this.props.user.stats.kind >= 15 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/kind_gold.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/kind_gold.png')}
                      />
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {this.props.user.stats.funny >= 1 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/funny_bronze.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/funny_bronze.png')}
                      />
                    )}
                    {this.props.user.stats.funny >= 5 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/funny_silver.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/funny_silver.png')}
                      />
                    )}
                    {this.props.user.stats.funny >= 15 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/funny_gold.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/funny_gold.png')}
                      />
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {this.props.user.stats.intellectual >= 1 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/intellectual_bronze.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/intellectual_bronze.png')}
                      />
                    )}
                    {this.props.user.stats.intellectual >= 5 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/intellectual_silver.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/intellectual_silver.png')}
                      />
                    )}
                    {this.props.user.stats.intellectual >= 15 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/intellectual_gold.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/intellectual_gold.png')}
                      />
                    )}
                  </View>
                  <View style={styles.badge__category}>
                    {this.props.user.stats.therapeutic >= 1 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/therapeutic_bronze.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/therapeutic_bronze.png')}
                      />
                    )}
                    {this.props.user.stats.therapeutic >= 5 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/therapeutic_silver.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/therapeutic_silver.png')}
                      />
                    )}
                    {this.props.user.stats.therapeutic >= 15 ? (
                      <Image
                        style={styles.ownBadge}
                        source={require('../assets/therapeutic_gold.png')}
                      />
                    ) : (
                      <Image
                        style={styles.noBadge}
                        source={require('../assets/therapeutic_gold.png')}
                      />
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.edit__button}
                onPress={() => this.props.toggleActiveSearch()}
              >
                <Text style={styles.button__text}>Toggle active</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.edit__button}
                onPress={() => this.props.logOut()}
              >
                <Text style={styles.button__text}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <EditProfile />
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent__container: {
    backgroundColor: '#e5e6e5'
  },
  profile__header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e5e6e5'
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
  },
  edit__button: {
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
  profile__body: {
    padding: 25,
    flexDirection: 'column',
    backgroundColor: '#e5e6e5'
  },
  photo_container: {
    marginTop: 20,
    height: 255,
    width: 255,
    borderRadius: 130,
    // backgroundColor: "#73d961",
    alignItems: 'center',
    justifyContent: 'center'
  },
  basic_info_container: {
    marginLeft: 10,
    alignItems: 'center',
    padding: 25
  },
  user__image: {
    borderRadius: 125,
    height: 250,
    width: 250
  },
  user__name: {
    fontSize: 28,
    fontWeight: '800'
  },
  user__level: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  user__xp: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5
  },
  info__title: {
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: '800'
  },
  interests__container: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 10
  },
  interests__text: {},
  email__phone: {
    marginTop: 25,
    marginBottom: 25,
    left: 15
  },
  inner__text: {
    margin: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  divider: {
    backgroundColor: '#acbdac',
    height: 1.5
  },
  top__badges: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5
  },
  all__badges: {
    flexDirection: 'column',
    marginTop: 25
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
  button__container: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 25
  }
})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProfile: () => dispatch({ type: 'SHOW_EDIT_PROFILE_FORM' }),
    toggleActiveSearch: () => dispatch({ type: 'TOGGLE_ACTIVE_SEARCH' }),
    logOut: () => dispatch(logOut())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
