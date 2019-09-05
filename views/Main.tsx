import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import axios from "axios"
import { any } from 'prop-types'
import getApiUrl from '../environment.js'
import Meets from "./Meets"
import Events from "./Events"

interface Props {
    toggleView: Function,
    setAllUsers: Function
}

class Main extends Component<Props> {
    async componentDidMount() {
        this.props.toggleView("meets")

        const res = await axios.post(`${getApiUrl()}/graphql`, {
            query: `
            query { Users {
                first_name
                last_name
                lvl
                exp
                }
            }
        `
        })
        // console.log(res.data.data.Users)
        this.props.setAllUsers(res.data.data.Users)
        console.log(this.props.allUsers, "all users using the app")
    }
    //Users = res.data.data.Users

    render() {
        let mainView;

        if (this.props.activeView === "events") {
            mainView = <Events />
        } else if (this.props.activeView === "meets") {
            mainView = <Meets />
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