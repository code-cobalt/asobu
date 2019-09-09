import React, { Component } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, TextInput, Dimensions, Animated, Easing, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import Badges from "../components/Badges"

const { height, width } = Dimensions.get("window")

interface Props {
  username: string,
  showEvent: boolean,
  setUserName: Function,
  closeEvent: Function
  currentEvent: Event
}

interface Event {
  name: string,
  description: string,
  location: string
}

export class AnimatedProfile extends Component<Props> {
  componentDidUpdate() {
    if (this.props.showEvent) {
      this.yTranslate.setValue(0);
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start();
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  yTranslate = new Animated.Value(0)

  componentWillUnmount() {
    this.props.closeEvent()
  }

  render() {
    let negativeHeight = -height
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    })
    let translateStyle = { transform: [{ translateY: modalMoveY }] }
    console.log(this.props.showEvent)
    return (
      <Animated.View style={[styles.contentContainer, translateStyle]}>
        <ScrollView style={styles.scrollView}>
          <Text>This is the event name</Text>
          <Text>This is the event description</Text>
          <Text>This is the event time</Text>
          <Text>This is the attendees block</Text>
          <TouchableOpacity onPress={this.props.closeEvent} style={styles.event__close}>
            <Text>Close</Text>
          </TouchableOpacity>

        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    position: "absolute",
    height: (height / 100) * 91.7,    
    width: width,
    bottom: -height,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginTop: 100,
    marginLeft: 100
  }, 
  event__close: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  }
})

const mapStateToProps = state => {
  return {
    showEvent: state.showEvent,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeEvent: () => {
      dispatch({
        type: "CLOSE_EVENT"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedProfile)
