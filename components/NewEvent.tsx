import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native'

interface State {
    name: string,
    location: string,
    description: string,
    cover_photo: string,
    limit: number,
    start: Date,
    end: Date,
    tags: Array<string>
}

interface ServerData {
    id: string,
    name: string,
    description: string,
    cover_photo: string,
    creator: Creator,
    start: Date,
    end: Date,
    location: string,
    limit: number,
    tags: Array<string>,
    attendees: Array<Object>
    comments: Array<Comment>
  }

class NewEvent extends Component<State> {
    state = {
        name: "",
        location: "",
        description: "",
        }

   render(){
       return(
           <ScrollView contentContainerStyle={styles.newEvent}>
               <View style={styles.text__formgroup}>
                    <Text style={styles.input__text}>Name your Event!</Text>
                    <TextInput style={styles.event__input} value={this.state.name} onChangeText={text => this.setState({ name: text })}/>
                    <Text style={styles.input__text}>Set a Location!</Text>
                    <TextInput style={styles.event__input} value={this.state.location} onChangeText={text => this.setState({ location: text })}/>
                    <Text style={styles.input__text}>Tell us about it!</Text>
                    <TextInput style={styles.event__input} value={this.state.description} onChangeText={text => this.setState({ description: text })}/>
                    <Text>Attendee Limit</Text>
                    <Text>Start</Text>
                    <Text>End</Text>
                    <Text>Tags</Text>
               </View>
               <View>
                    <Text>Upload a cover photo for your Event!</Text>
               </View>
               <View>
                    <Text>Set a start and end time for your event.</Text>
               </View>
           </ScrollView>
       )
   }
}

const styles = StyleSheet.create({
    text__formgroup: {
        width: '90%',
    },
    newEvent: {
        marginTop: 60,
        alignItems: "center"
    },
    event__input: {
        height: 50,
        borderColor: 'gray',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 30,
        textAlign: 'center'
    },
    input__text: {
        alignSelf: 'center',
        fontWeight: '700'
    }
})
// const mapStateToProps = () => {}
// const mapDispatchToProps = () => {}

export default (NewEvent)