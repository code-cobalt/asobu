"use strict";
exports.__esModule = true;

import React from 'react'
import { View, Text, StyleSheet } from "react-native"
import MainApp from "./App.tsx"

function App() {
  return (
    <View style={styles.container}>
      <MainApp style={styles.mainApp}></MainApp>
    </View>
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
