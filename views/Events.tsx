import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from 'react-redux'
import axios from 'axios'
import getApiUrl from '../environment.js'
import EventList from "../components/EventList"

interface Props {
    getEvents: Function,
}

export class Events extends Component<Props> {
    async componentDidMount() {
        const res = await axios.post(`${getApiUrl()}/graphql`, {
            query: `
            query { Events {
                id
                name
                description
                cover_photo
                creator {
                    first_name
                    email
                    profile_photo
                }
                start
                end
                location
                limit
                tags
                attendees {
                    first_name
                    email
                    profile_photo
                }
                comments {
                    id
                }
                }
            }
        `
        })
        this.props.getEvents(res.data.data.Events)
    }

    render() {
        return (
            <View style={styles.events}>
                <EventList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    events: {
        top: 40,
        flex: 1,
    }
})

const mapDispatchToProps = dispatch => {
    return {
        getEvents: (events) => {
            dispatch({
                type: "GET_EVENTS",
                events
            })
        }
    }
}



export default connect(null, mapDispatchToProps)(Events)