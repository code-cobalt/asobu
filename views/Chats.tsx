import { View, StyleSheet } from 'react-native'
import ChatList from '../components/ChatList'
import AnimatedChat from './AnimatedChat'

const Chats = () => {
  return (
    <View style={styles.events}>
      <ChatList />
      <AnimatedChat />
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
