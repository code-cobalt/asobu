import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import Badges from "./Badges"
import { connect } from "react-redux"

const User = props => {
    return (
        <View style={styles.user}>
            <Image source={{ uri: props.user.profile_photo }} style={styles.user__image} />
            <View style={styles.user__textcontainer}>
                <Text style={styles.user__text}>{props.first_name} {props.last_name}</Text>
                <Text style={styles.user__text}>Level: {props.lvl}</Text>
            </View>
            <View style={styles.user__badges}>
                <Badges />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    user: {
        flexDirection: "row"
    },
    user__image: {
        borderRadius: 50
    },
    user__textcontainer: {
        flexDirection: "column"
    },
    user__text: {
        fontSize: 16,
        color: "white"
    },
    user__badges: {
        justifyContent: "center",
        alignItems: "center"
    }
})

const mapStateToProps = state => {
    return {
        allUsers: state.allUsers,
    }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(User)