import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import Meets from "./Meets"
import Events from "./Events"
import Profile from "./Profile"
import { NetworkInfo } from "react-native-network-info"
import axios from "axios"
import { any } from 'prop-types'
import getApiUrl from '../environment.js'

class Main extends Component {
    async componentDidMount() {
        this.props.toggleView("meets")

        const res = await axios.post(`${getApiUrl()}/graphql`, {
        query: `
            query { Users {
                first_name
                }
            }
        `   
        })
        console.log(res.data.data.Users)
        this.props.setAllUsers(res.data.data.Users)
        console.log(this.props.allUsers[0], "all users using the app")
    }
    //Users = res.data.data.Users

    render() {
        let mainView;

        if (this.props.activeView === "events") {
            mainView = <Events />
        } else if (this.props.activeView === "meets") {
            mainView = <Meets />
        } else if (this.props.activeView === "profile") {
            mainView = <Profile />
        }
        return (
            <View style={styles.main}>
                {mainView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 11,
        backgroundColor: "green",
    }
})

const mapStateToProps = state => {
    return {
        activeView: state.activeView,
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleView: (currentView) => {
            dispatch({
                type: "SET_VIEW",
                currentView: currentView
            })
        },
        setAllUsers: (allUsers) => {
            dispatch({
                type: "SET_ALL_USERS",
                allUsers: allUsers
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)


{/* <Button 
    title="Toggle Button" 
    onPress={() => {
        if (this.props.currentView === "events") {
            this.props.toggleView("meets")
        }else if (this.props.currentView === "meets") {
            this.props.toggleView("events")
        }
    }}
/> */}