import React from 'react'
import Main from "./Main"
import Navbar from "../components/Navbar"
import { Alert } from "react-native"
import { connect } from 'react-redux'
import { sockethost } from '../environment.js'

interface Props {
    email: string
}

class Application extends React.Component<Props> {
    componentDidMount() {
        const connection = new WebSocket(sockethost)
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
}

export default connect(mapStateToProps, null)(Application)
