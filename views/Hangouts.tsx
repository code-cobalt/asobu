import React from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import UserList from "../components/UserList"

const Hangouts = props => {
    return (
        <View style={styles.userList}>
            <UserList />
        </View>
    )
}

const styles = StyleSheet.create({
    userList: {
        top: 40,
    }
})

export default Hangouts

