import React from 'react'
import Main from './Main'
import Navbar from '../components/Navbar'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { sockethost, apiUrl } from '../environment.js'
import axios from "axios"

interface Props {
    email: string,
    setSocket: Function
    chat_id: number
    showChat: Function
    initializeSocket: Function
}

class Application extends React.Component<Props> {
    componentDidMount() {
        this.props.connection()
        /* const connection = new WebSocket(sockethost)
        const m0 = new RegExp(/m0/)
        connection.onopen = () => {
            console.log('Connection Open')
            connection.send(`l0 ${this.props.email}`)
        }
        connection.onerror = error => {
            console.log(error)
        }
        connection.onmessage = async e => {
            console.log(e.data)
            Alert.alert(e.data)

            if (m0.test(e.data)) {
                const chat = await axios.post(`${apiUrl}/graphql`, {
                    query: `
                      query { Chats(chatIds: [${this.props.chat_id}]) {
                          messages {
                            id
                            content
                            timestamp
                            from {
                              first_name
                              profile_photo
                              email
                            }
                          }
                        }
                      }
                    `
                })
                this.props.showChat(chat.data.data.Chats.pop().messages, this.props.chat_id)
            }
        }
        this.props.setSocket(connection.send.bind(connection))
        console.log(this.props.socket)
        console.log(typeof connection.send) */
    }

    render() {
        return (
            <>
                <Main />
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
