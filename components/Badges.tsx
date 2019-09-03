import React, { Component } from 'react' 
import {View, Text, Image, StyleSheet, TextInput} from "react-native"

export class Badges extends Component {
  render() {
    const images = ["../assets/Badge1.png", "../assets/Badge2.png", "../assets/Badge3.png"]
    const badges = images.map((image, index) => {
      return(
        <Image key={index} source={{uri: image}}></Image>
      )
    })
    return (
      <>
        {badges}
      </>
    )
  }
}

export default Badges


//style={user.hasBadge ? styles.active : styles.inactive}