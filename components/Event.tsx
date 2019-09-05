import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"

export class Event extends Component {

    render() {
        return (
            <View>
                <Text>This is an Event</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {

    }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(Event)