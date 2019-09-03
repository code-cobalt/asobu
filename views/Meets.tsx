import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, TextInput} from "react-native"
import { connect } from "react-redux"

export class Meets extends Component {
 
    render () {
        const dummyUsers = this.props.activeUsers.map((user, index) => {
            return (
                <Text key={index} >{user}</Text>
            )
        })

        return (
            <View>
                <Text>This is the meets component</Text>
                <>{dummyUsers}</>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeUsers: state.activeUsers,
    }
}

// const mapDispatchToProps = dispatch => {
  
// }

export default connect(mapStateToProps)(Meets)