import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput } from "react-native"
import { connect } from "react-redux"
import Meets from "./Meets"
import Events from "./Events"

class Main extends Component {
    componentDidMount() {
        this.props.toggleView("meets")
    }

    render() {
        let mainView;

        if (this.props.currentView === "events") {
            mainView = <Events />
        } else if (this.props.currentView === "meets") {
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
        currentView: state.currentView
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleView: (currentView) => {
            dispatch({
                type: "SET_VIEW",
                currentView: currentView
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