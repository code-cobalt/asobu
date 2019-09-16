import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"

export default class Badges extends Component {
  render() {
    const images = ["../assets/Badge1.png", "../assets/Badge2.png", "../assets/Badge3.png"]
    // const badges = images.map((image, index) => {
    //   return (
    //       <Image key={index} source={require("../assets/Badge3.png")} style={{ height: 40, width: 40 }}></Image>
    //   )
    // })
    return (
      <>
        <Image source={require("../assets/scroll_gold.png")} style={{ height: 40, width: 40 }}></Image>
        <Image source={require("../assets/leaf_gold.png")} style={{ height: 40, width: 40 }}></Image>
        <Image source={require("../assets/crown_badge3.png")} style={{ height: 40, width: 40 }}></Image>
      </>
    )
  }
}


//style={user.hasBadge ? styles.active : styles.inactive}