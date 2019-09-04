import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from "react-native"

class NavigationBar extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <View>
                    <Image style={styles.navbar__image} source={require("../assests/Profile.png")}></Image>
                    <Text style={styles.navbar__text}>Profile</Text>
                </View>

                <View>
                    <Image style={styles.navbar__image} source={require("../assets/Main.png")}></Image>
                    <Text style={styles.navbar__text}>Main</Text>
                </View>
                <View>
                    <Image style={styles.navbar__image} source={require("../assets/Chat.png")}></Image>
                    <Text style={styles.navbar__text}>Chats</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: 'black',
    },
    navbar__image: {
        height: 20,
        width: 20
    },
    navbar__text: {
        color: "white"
    }
})

export default NavigationBar
