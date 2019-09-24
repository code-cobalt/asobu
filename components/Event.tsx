import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

const Event = props => {
  return (
    <TouchableOpacity
      style={styles.event}
      onPress={() => props.showEvent(props.event)}
    >
      <View style={styles.photo__container}>
        {props.event.cover_photo !== '' && props.event.cover_photo ? (
          <Image
            source={{ uri: props.event.cover_photo }}
            style={styles.event__photo}
          />
        ) : (
          <Image
            source={{
              uri:
                'http://res.cloudinary.com/code-cobalt/image/upload/v1569218014/demo/vsqwabgm74fpqpw1ghad.jpg'
            }}
            style={styles.event__photo}
          />
        )}
      </View>
      <View style={styles.text__box}>
        <Text style={styles.event__title}>{props.event.name}</Text>
        <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 10 }}>{props.event.description}</Text>
        <Text style={{ fontSize: 12, alignSelf: 'center', marginTop: 20 }}>
          Created by {props.event.creator.first_name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  event: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  event__title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '800',
    paddingBottom: 15
  },
  photo__container: {
    height: 250,
    width: 300,
    borderRadius: 10
  },
  event__photo: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 10
  },
  event__text: {
    fontSize: 18,
    padding: 5,
    alignSelf: 'center'
  },
  text__box: {
    paddingTop: 15,
    paddingBottom: 15
  }
})

const mapDispatchToProps = dispatch => {
  return {
    showEvent: event => {
      dispatch({
        type: 'SHOW_EVENT',
        event
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Event)
