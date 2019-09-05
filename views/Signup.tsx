import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native'

interface State {
  email: string,
  first_name: string,
  last_name: string,
  phone: string,
  password: string
}

class Signup extends Component<{}, State> {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: ""
  }

  handleSignup = () => {
    //handle signup
  }

  render() {
    return (
      <ImageBackground source={require("../assets/login.jpg")} style={styles.signup}>
        <View style={styles.signup__formgroup}>
          <Text style={styles.signup__label}>Email</Text>
          <TextInput value={this.state.email} onChangeText={text => this.setState({ email: text })} style={styles.signup__input} />
        </View>
        <View style={styles.signup__formgroup}>
          <Text style={styles.signup__label}>First Name</Text>
          <TextInput value={this.state.first_name} onChangeText={text => this.setState({ first_name: text })} style={styles.signup__input} />
        </View>
        <View style={styles.signup__formgroup}>
          <Text style={styles.signup__label}>Last Name</Text>
          <TextInput value={this.state.last_name} onChangeText={text => this.setState({ last_name: text })} style={styles.signup__input} />
        </View>
        <View style={styles.signup__formgroup}>
          <Text style={styles.signup__label}>Phone</Text>
          <TextInput value={this.state.phone} onChangeText={text => this.setState({ phone: text })} style={styles.signup__input} />
        </View>
        <View style={styles.signup__formgroup}>
          <Text style={styles.signup__label}>Password</Text>
          <TextInput value={this.state.password} secureTextEntry={true} onChangeText={text => this.setState({ password: text })} style={styles.signup__input} />
        </View>
        <TouchableOpacity onPress={this.handleSignup} style={styles.signup__button}>
          <Text style={styles.signup__button__text}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signup__formgroup: {
    width: "90%",
  },
  signup__label: {
    marginLeft: 15,
    marginBottom: 5,
    color: "#fff"
  },
  signup__input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 50,
    textAlign: "center",
    backgroundColor: "#fff",
    opacity: 0.8
  },
  signup__button: {
    width: "50%",
    backgroundColor: "#73d961",
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  signup__button__text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
})

export default Signup
