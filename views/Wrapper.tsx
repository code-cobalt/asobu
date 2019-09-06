import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from "react-redux"
import Main from "./Main"
import Navbar from "../components/Navbar"
import Auth from "../components/Auth"

interface Props {
  isLoggedIn: boolean
}

class Wrapper extends Component<Props> {
  render() {
    return (
      <>
        {this.props.isLoggedIn ? <Main /> : null}
        {this.props.isLoggedIn ? <Navbar /> : null}
        {!this.props.isLoggedIn ? <Auth /> : null}
      </>
    )
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(Wrapper)
