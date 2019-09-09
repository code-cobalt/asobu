import React from "react"
import { Switch, StyleSheet } from "react-native"
import { connect } from "react-redux"
import SwitchSelector from "react-native-switch-selector"
import Hangouts from './Hangouts'
import Events from './Events'
import AnimatedProfile from "./AnimatedProfile"

const options = [
    { label: "Hangouts", value: "hangouts" },
    { label: "Events", value: "events" },
];

const Results = props => {
    return (
        <>
            <SwitchSelector options={options} initial={0} style={styles.results__switch} onPress={value => props.toggleResultsView(value)} />
            {props.resultsSwitch === "hangouts" ? <Hangouts /> : <Events />}
            <AnimatedProfile />
        </>
    )
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