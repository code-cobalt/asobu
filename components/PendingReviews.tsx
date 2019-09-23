import React from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import Badges from './Badges'

const PendingReviews = props => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>You still need to review</Text>
      <ScrollView style={styles.request}>
        {props.pendingReviews.map((review, index) => {
          return (
            <View key={index}>
              <Image
                source={{ uri: review.profile_photo }}
                style={styles.user__image}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <Text style={styles.user__name}>{review.first_name}</Text>
                {review.equipped_badges && (
                  <View style={styles.badges}>
                    <Badges badges={review.equipped_badges} />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.start_button}
                  onPress={() => props.finishReview(review.email)}
                >
                  <Text style={styles.button_text}>Review</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  userList: {
    top: 40
  },
  modal: {
    height: '50%',
    textAlign: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  badges: {
    flexDirection: 'row'
  },
  request: {
    flexDirection: 'column',
    margin: 10
  },
  user__image: {
    alignSelf: 'center',
    borderRadius: 55,
    height: 110,
    width: 110,
    marginBottom: 5
  },
  user__name: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 34,
    marginBottom: 5
  },
  accept__button: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  decline__button: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  close: {
    textAlign: 'right',
    right: 0,
    position: 'absolute',
    bottom: 0
  },
  start_button: {
    alignSelf: 'center',
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 50,
    padding: 15
  },
  button_text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

const mapStateToProps = state => {
  return {
    pendingReviews: state.pendingReviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    finishReview: userToReview => {
      dispatch({ type: 'FINISH_REVIEW', userToReview })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingReviews)
