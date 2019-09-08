import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"

export class Events extends Component {
    render() {
        return (
            <View style={styles.events}>
                <Text>This is the events component</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeEvents: state.activeEvents,
    }
}

const styles = StyleSheet.create({
    events: {
        top: 40,
        flex: 1,
        backgroundColor: "purple",
    }
})

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(Events)