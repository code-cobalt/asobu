import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"

export class User extends Component {

    render() {
        const test = () => {
            console.log(this.props.userObject)
        }
        return (
            <View>
                <Text>This is a User</Text>
                {test}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        allUsers: state.allUsers,
    }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(User)