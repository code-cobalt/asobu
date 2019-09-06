import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import UserList from "../components/UserList"
import EventList from "../components/EventList"

export class Meets extends Component {

    render() {
        // const dummyUsers = this.props.allUsers.map((user, index) => {
        //     return (
        //         <Text key={index} >{user.first_name}</Text>
        //     )
        // })
        return (
            <View style={styles.meets}>
                <Text style={{ color: "white" }}>This is the meets component</Text>
                <UserList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    meets: {
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        backgroundColor: "red",
    }
})

const mapStateToProps = state => {
    return {
        activeUsers: state.activeUsers,
        allUsers: state.allUsers
    }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(Meets)