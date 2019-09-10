import React, { Component } from "react"
import { Switch, StyleSheet, Animated } from "react-native"
import { connect } from "react-redux"
import SwitchSelector from "react-native-switch-selector"
import Hangouts from './Hangouts'
import Events from './Events'
import AnimatedProfile from "./AnimatedProfile"
import AnimatedEvent from  "./AnimatedEvent"

const options = [
    { label: "Hangout", value: "hangouts" },
    { label: "Events", value: "events" },
];

export default class Results extends Component {
    componentDidMount() {
        this.props.toggleResultsView("hangouts")
     }

    render() {
        return (
            <>
                <SwitchSelector options={options} initial={0} style={styles.results__switch} onPress={value => this.props.toggleResultsView(value)} />
                {this.props.resultsSwitch === "hangouts" ? <Hangouts /> : <Events />}
                <AnimatedProfile />
                <AnimatedEvent />
            </>
        )
    }
}

const styles = StyleSheet.create({
    results__switch: {
        top: 40
    }
})
const mapStateToProps = state => {
    return {
        resultsSwitch: state.resultsSwitch
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleResultsView: activeView => {
            dispatch({
                type: "TOGGLE_RESULTS_VIEW",
                activeView
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)