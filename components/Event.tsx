import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'

const Event = props => {
    return (
        <TouchableOpacity style={styles.event} onPress={() => props.showEvent(props.event)}>
            <View style={styles.photo__container}>
                {props.event.name === "Quidditch After Party" && <Image source={require("../assets/quidditch.jpg")} style={styles.event__photo} />}
                {props.event.name === "Language Exchange" && <Image source={require("../assets/language.jpg")} style={styles.event__photo} />}

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
    photo__container: {
        height: 250,
        width: 300,
        borderRadius: 10
    },
    event__photo: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: 10
    },
    event__text: {
        padding: 15
    }
})

const mapDispatchToProps = dispatch => {
	return {
		showEvent: event => {
			dispatch({
				type: "SHOW_EVENT",
				event
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(Event)