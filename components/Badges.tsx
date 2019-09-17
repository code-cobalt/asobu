import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { join } from 'path'

export default class Badges extends Component {
  render() {
    const images = ["../assets/Badge1.png", "../assets/Badge2.png", "../assets/Badge3.png"]
    // const badges = images.map((image, index) => {
    //   return (
    //       <Image key={index} source={require("../assets/Badge3.png")} style={{ height: 40, width: 40 }}></Image>
    //   )
    // })
    return (
      <View style={styles.badges}>
        <View style={styles.badges__equipped}>
          <Image source={require("../assets/funny_gold.png")} style={{ height: 40, width: 40 }}></Image>
        </View>
        <View style={styles.badges__equipped}>
          <Image source={require("../assets/socket.png")} style={{ height: 40, width: 40 }}></Image>
        </View>
        <View style={styles.badges__equipped}>
          <Image source={require("../assets/socket.png")} style={{ height: 40, width: 40 }}></Image>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badges: {
    flexDirection: 'row',
  },
  badges__equipped: {
    margin: 5
  }
})


//style={user.hasBadge ? styles.active : styles.inactive}