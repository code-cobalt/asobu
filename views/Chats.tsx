import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"

export class Chats extends Component {
    render() {
        return (
            <View style={styles.events}>
                <Text>This is the chats component</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    events: {
        flex: 1,
        backgroundColor: "purple",
    }
})

export default Chats