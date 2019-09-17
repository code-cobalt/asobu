import { View, StyleSheet } from 'react-native'
import ChatList from '../components/ChatList'

const Chats = () => {
  return (
    <View style={styles.events}>
      <ChatList />
    </View>
  )
}

const styles = StyleSheet.create({
  events: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Chats
