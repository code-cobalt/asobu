import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import ReviewCounter from './ReviewCounter'
import { connect } from 'react-redux'
import { reviewUser, addExp } from '../src/actions/users'

interface State {
  totalPoints: number
  funny: number
  intellectual: number
  fun: number
  kind: number
  therapeutic: number
  interesting: number
}

interface Props {
  showReview: boolean
  addExp: Function
  reviewUser: Function
  currentUser: CurrentUser
  endReview: Function
  userToReview: UserLimited
}

interface CurrentUser {
  email: string
  lvl: number
}

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
  equipped_badges: string[]
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
    if (action === 'increment' && this.state.totalPoints !== 0) {
      this.setState({
        [name]: this.state[name] + 1,
        totalPoints: this.state.totalPoints - 1
      })
    } else if (action === 'decrement' && this.state[name] > 0) {
      this.setState({
        [name]: this.state[name] - 1,
        totalPoints: this.state.totalPoints + 1
      })
    }
  }

  reviewUser = async () => {
    const stats = {
      funny: this.state.funny,
      intellectual: this.state.intellectual,
      fun: this.state.fun,
      kind: this.state.kind,
      therapeutic: this.state.therapeutic,
      interesting: this.state.interesting
    }
    this.props.endReview(
      this.props.currentUser.email,
      this.props.userToReview.email,
      stats
    )
    this.props.addExp(this.props.currentUser.email, 40)
  }

  currentUserPoints = async () => {
    let currentPoints
    if (this.props.currentUser.lvl === 1) {
      currentPoints = 2
    } else if (
      this.props.currentUser.lvl > 1 &&
      this.props.currentUser.lvl < 4
    ) {
      currentPoints = 3
    } else if (
      this.props.currentUser.lvl > 3 &&
      this.props.currentUser.lvl < 7
    ) {
      currentPoints = 4
    } else if (
      this.props.currentUser.lvl > 6 &&
      this.props.currentUser.lvl < 10
    ) {
      currentPoints = 5
    } else if (this.props.currentUser.lvl === 10) {
      currentPoints = 6
    }
    this.setState({ totalPoints: currentPoints })
  }

  componentDidMount() {
    this.currentUserPoints()
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
        <Text style={styles.review__title}>
          You have {this.state.totalPoints} points left
        </Text>
        <ReviewCounter
          value={this.state.funny}
          onChange={this.onChange}
          name={'funny'}
          label={'Funny'}
        />
        <ReviewCounter
          value={this.state.intellectual}
          onChange={this.onChange}
          name={'intellectual'}
          label={'Intellectual'}
        />
        <ReviewCounter
          value={this.state.fun}
          onChange={this.onChange}
          name={'fun'}
          label={'Fun'}
        />
        <ReviewCounter
          value={this.state.kind}
          onChange={this.onChange}
          name={'kind'}
          label={'Kind'}
        />
        <ReviewCounter
          value={this.state.therapeutic}
          onChange={this.onChange}
          name={'therapeutic'}
          label={'Therapeutic'}
        />
        <ReviewCounter
          value={this.state.interesting}
          onChange={this.onChange}
          name={'interesting'}
          label={'Interesting'}
        />
        <TouchableOpacity
          style={styles.review__button}
          onPress={() => this.reviewUser()}
        >
          <Text style={styles.button__text}>Finish Review!</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    textAlign: 'center',
    marginTop: 40
  },
  review__title: {
    color: '#fff',
    fontWeight: '900',
    marginBottom: 40
  },
  review__container: {
    flex: 1
  },
  review__button: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 100,
    padding: 15,
    marginTop: 20,
    alignSelf: 'center'
  },
  button__text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

const mapStateToProps = state => {
  return {
    showReview: state.showReview,
    userToReview: state.userToReview,
    currentUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addExp: (userEmail, points) => dispatch(addExp(userEmail, points)),
    endReview: (currentUser, userToReview, stats) =>
      dispatch(reviewUser(currentUser, userToReview, stats))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review)
