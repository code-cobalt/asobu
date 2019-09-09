import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from "react-native"
import { connect } from "react-redux"
import Event from "../components/Event"

const EventList = props => {
    const eventList = props.allEvents.map(event => {
        return (
            <Event key={event.id} event={event} />
        )
    })
    return (
        <ScrollView>
            {eventList}
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        allEvents: state.allEvents
    }
}

export default connect(mapStateToProps)(EventList)