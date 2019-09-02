"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
function App() {
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text>Open up App.tsx to start working on your app!!</react_native_1.Text>
    </react_native_1.View>);
}
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
