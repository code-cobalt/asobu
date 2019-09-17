import { SafeAreaView, View, StyleSheet } from 'react-native'
import ChatList from '../components/ChatList'

const Chats = () => {
  return (
    <SafeAreaView style={styles.events}>
      <ChatList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  events: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

export default Chats
