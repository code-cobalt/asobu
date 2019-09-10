import React from 'react'
import Main from "./Main"
import Navbar from "../components/Navbar"
import { Alert } from "react-native"
import { connect } from 'react-redux'
import getApiUrl from '../environment.js'
import { print } from "graphql"
import gql from "graphql-tag"
import axios from "axios"

interface Props {
    email: string
}

class Application extends React.Component<Props> {
    /* constructor(props) {
        super(props)
        
    }
 */
    componentDidMount() {
        const connection = new WebSocket("ws://192.168.10.127:3001")
        connection.onopen = () => {
            console.log("Connection Open")
            connection.send(`l0 ${this.props.email}`)

        }
        connection.onerror = error => {
            console.log(error)
        }
        connection.onmessage = e => {
            console.log(e.data)
            Alert.alert(e.data)
        }
    }

    render() {
        return (
            <>
                <Main />
                <Navbar />
            </>)
    }
}

const mapStateToProps = state => {
    return {
        email: state.user.email
    }
}

export default connect(mapStateToProps, null)(Application)