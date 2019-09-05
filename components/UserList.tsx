import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import User from "../components/User"

export class UserList extends Component {

    render() {
        return (
            <View>
                <Text>This is the User List</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        activeUsers: state.activeUsers,
        allUsers: state.allUsers
    }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(UserList)