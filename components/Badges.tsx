import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"

export default class Badges extends Component {
  render() {
    const images = ["../assets/Badge1.png", "../assets/Badge2.png", "../assets/Badge3.png"]
    const badges = images.map((image, index) => {
      return (
        <Image key={index} source={{ uri: image }} style={{ height: 50, width: 50 }}></Image>
      )
    })
    return (
      <>
        {badges}
      </>
      // <Image source={require("./../assets/Badge2.png")} style={{height: 50, width: 50}}></Image>
    )
  }
}


//style={user.hasBadge ? styles.active : styles.inactive}