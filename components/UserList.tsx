import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import User from "../components/User"

export class UserList extends Component {

    render() {
        const currentUser = this.props.allUsers.map((user, index) => {
            //set the state or pass params for each user here.
            //then, build the 'user' component for each user
            //return user
            const userObject = {
                stateIndex: index,
                userFirstName: user.first_name,
                userLastName: user.last_name,
                userId: user.id,
                userProfilePic: user.profile_photo,
                userLvl: user.lvl,
                userInterest: user.interests
            }

            return (
                <User {...userObject} />
            )
        })

        return (
            <View>
                {currentUser}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        activeUsers: state.activeUsers,
        allUsers: state.allUsers,
    }
}

export default connect(mapStateToProps)(UserList)