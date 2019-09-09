import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

const Event = props => {
    return (
        <TouchableOpacity style={styles.event}>
            <View style={styles.event__photo}>
                <Text>PHOTO GOES HERE</Text>
            </View>
            <View style={styles.event__text}>
                <Text style={styles.event__title}>{props.event.name}</Text>
                <Text>{props.event.description}</Text>
                <Text>Created by {props.event.creator.first_name}</Text>
                <Text>Located at "{props.event.location}" on {props.event.start}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    event: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: "#e5e6e5",
        borderRadius: 10
    },
    event__title: {
        fontSize: 18,
        fontWeight: "600"
    },
    event__photo: {
        height: 250,
        width: 300,
        backgroundColor: "black",
        borderRadius: 10
    },
    event__text: {
        padding: 15
    }
})

export default Event