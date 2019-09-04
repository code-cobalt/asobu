import React, { Component } from 'react'
import {View, Button, Text, Image, StyleSheet, TextInput} from "react-native"
import { connect } from "react-redux"
import Meets from "./Meets"
import Events from "./Events"

export class Main extends Component {
    componentDidMount() {
        this.props.toggleView("meets")
    }

    render () {
        let mainView;

        if (this.props.currentView === "events") {
            mainView = <Events/>
        } else if (this.props.currentView === "meets") {
            mainView = <Meets/>
        }
        return (
            <View>
                <Button 
                    title="Toggle Button" 
                    onPress={() => {
                        if (this.props.currentView === "events") {
                            this.props.toggleView("meets")
                        }else if (this.props.currentView === "meets") {
                            this.props.toggleView("events")
                        }
                    }}
                />
                {mainView}
            </View>
        )
    }
}

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