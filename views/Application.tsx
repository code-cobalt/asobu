import React from 'react'
import Main from './Main'
import Navbar from '../components/Navbar'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import axios from "axios"
import sockethost from "../environment"

interface Props {
    email: string,
    setSocket: Function
    chat_id: number
    showChat: Function
    initializeSocket: Function
}

class Application extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    render() {
        return (
            <>
                <Main socket={this.props.socket} />
                <Navbar />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.user.email,
        connection: state.connection,
        chat_id: state.currentChatId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeSocket: () => {
            dispatch({
                type: "INITIALIZE_SOCKET"
            })
        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Application)
