"use strict";
exports.__esModule = true;
import React from 'react'
import { Provider, connect } from 'react-redux'
import { store } from './src/store'
import { View, Text, StyleSheet } from "react-native"
import MainApp from "./App.tsx"

function App() {
  return (
    <Provider store={store}>
       <View style={styles.container}>
        <MainApp style={styles.mainApp}></MainApp>
      </View>
    </Provider>
  );
}
exports["default"] = App;
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainApp: {
    flex: 1,
  }
});
