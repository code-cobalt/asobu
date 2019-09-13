import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Badges from './../components/Badges'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Event {
  event_id: string
  is_creator: boolean
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
  imei: string
}

interface Props {
  user: User
}

class Profile extends Component<Props> {
  render() {
    return (
      <View style={styles.profile}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.photo_container}>
              {this.props.user.profile_photo !== null && (
                <Image
                  source={{ uri: this.props.user.profile_photo }}
                  style={styles.user__image}
                />
              )}
              {this.props.user.profile_photo === null && (
                <Image
                  source={require("../assets/default_profile.png")}
                  style={styles.user__image}
                />
              )}
            </TouchableOpacity>
            <View style={styles.basic_info_container}>
              <Text style={styles.user_name}>
                {this.props.user.first_name} {this.props.user.last_name}
              </Text>
              <Text style={styles.user_level}>Level {this.props.user.lvl}</Text>
              <Text style={styles.user_xp}>XP {this.props.user.exp}</Text>
              <View style={styles.user_badges}>
                <Badges />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.interests}>Interests</Text>
            {this.props.user.interests.length > 0 &&
              this.props.user.interests.map(interest => {
                return <Text style={styles.interest}>{interest}</Text>
              })}
          </View>

          <View>
            <Text>All Badges</Text>
            <Badges />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 20
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#e5e6e5"
  },
  photo_container: {
    marginTop: 20,
    height: 255,
    width: 255,
    borderRadius: 130,
    backgroundColor: "#73d961",
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
    width: 250,
  },
  user_name: {
    fontSize: 28,
    fontWeight: "800"
  },
  user_level: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10
  },
  user_xp: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5
  },
  user_badges: {
    flexDirection: 'row',
    padding: 5
  },
  interests: {},
  interest: {}
})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)
