import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
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
        <View style={styles.header}>
          <View style={styles.photo_container}>
            {this.props.user.profile_photo !== null && (
              <Image
                source={{ uri: this.props.user.profile_photo }}
                style={styles.user__image}
              />
            )}
          </View>
          <View style={styles.basic_info_container}>
            <Text>
              {this.props.user.first_name} {this.props.user.last_name}
            </Text>
            <Text>Level {this.props.user.lvl}</Text>
            <Text>XP {this.props.user.exp}</Text>
          </View>
        </View>
        <View>
          <Text>Equipped Badges</Text>
          <Badges />
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 30,
    marginLeft: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  photo_container: {},
  basic_info_container: {
    marginLeft: 10
  },
  user__image: {
    borderRadius: 50,
    height: 110,
    width: 110,
    marginBottom: 10
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
