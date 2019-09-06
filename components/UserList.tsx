import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from "react-native"
import { connect } from "react-redux"
import User from "../components/User"

const UserList = props => {
    const userList = props.allUsers.map(user => {
        return (
            <User key={user.id} user={user} />
        )
    })
    return (
        <ScrollView>
            {userList}
        </ScrollView>
    )
}



const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        allUsers: state.allUsers,
    }
}

export default connect(mapStateToProps)(UserList)