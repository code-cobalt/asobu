import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import ReviewCounter from "./ReviewCounter"
import { connect } from "react-redux"

interface State {
  totalPoints: number,
  funny: number,
  intellectual: number,
  fun: number,
  kind: number,
  therapeutic: number,
  interesting: number
}

interface Props {
  showReview: boolean
}

class Review extends Component<Props, State> {
  state = {
    totalPoints: 5,
    funny: 0,
    intellectual: 0,
    fun: 0,
    kind: 0,
    therapeutic: 0,
    interesting: 0
  }

  onChange = (name, action) => {
    if (action === "increment" && this.state.totalPoints !== 0) {
      this.setState({ [name]: this.state[name] + 1, totalPoints: this.state.totalPoints - 1 })
    } else if (action === "decrement" && this.state[name] > 0) {
      this.setState({ [name]: this.state[name] - 1, totalPoints: this.state.totalPoints + 1 })
    }
  }

  render() {
    return (
      <Modal
        isVisible={this.props.showReview}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.85}
        style={styles.modal}
      >
        <Text style={styles.review__title}>You have {this.state.totalPoints} points left</Text>
        <ReviewCounter value={this.state.funny} onChange={this.onChange} name={"funny"} label={"Funny"} />
        <ReviewCounter value={this.state.intellectual} onChange={this.onChange} name={"intellectual"} label={"Intellectual"} />
        <ReviewCounter value={this.state.fun} onChange={this.onChange} name={"fun"} label={"Fun"} />
        <ReviewCounter value={this.state.kind} onChange={this.onChange} name={"kind"} label={"Kind"} />
        <ReviewCounter value={this.state.therapeutic} onChange={this.onChange} name={"therapeutic"} label={"Therapeutic"} />
        <ReviewCounter value={this.state.interesting} onChange={this.onChange} name={"interesting"} label={"Interesting"} />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    textAlign: 'center'

  },
  review__title: {
    color: "#fff"
  },
  review__container: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    showReview: state.showReview
  }
}

export default connect(mapStateToProps, null)(Review)
