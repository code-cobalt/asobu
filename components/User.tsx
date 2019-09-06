import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from "react-native"
import Badges from "./Badges"
import { connect } from "react-redux"

const User = props => {
    console.log(props.user.profile_photo, "this is a photo")
	return (
		<View style={styles.user}>
			{props.user.profile_photo !== null && <Image source={{ uri: props.user.profile_photo }} style={styles.user__image} />}
			<View style={styles.user__textcontainer}>
				<Text style={styles.user__text}>{props.user.first_name} {props.user.last_name}</Text>
				<Text style={styles.user__text}>Level: {props.user.lvl === null ? "1" : null}</Text>
			</View>
			<View style={styles.user__badges}>
				<Badges />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	user: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: "black",
        borderRadius: 400
	},
	user__image: {
		borderRadius: 50,
		height: 90,
		width: 90
	},
	user__textcontainer: {
        flexDirection: "column",
        alignItems: "center",
        marginLeft: 50,
        right: 40
	},
	user__text: {
		fontSize: 18,
		color: "white"
	},
	user__badges: {
		flexDirection: "row",
		justifyContent: "center",
        alignItems: "center",
        right: 15
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