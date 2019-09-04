import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"

export class Events extends Component {
    render() {
        const dummyEvents = this.props.activeEvents.map((event, index) => {
            return (
                <Text key={index} >{event}</Text>
            )
        })

        return (
            <View style={styles.events}>
                <Text>This is the events component</Text>
                <>{dummyEvents}</>
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
        flex: 1,
        backgroundColor: "red",
    }
})

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(Events)