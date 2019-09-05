import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import Event from "../components/Event"

export class Meets extends Component {

    render() {
        return (
            <View style={styles.meets}>
                <Text style={{ color: "white" }}>This is the meets component</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    meets: {
        flex: 1,
        backgroundColor: "red",
    }
})

const mapStateToProps = state => {
    return {
    }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(Meets)