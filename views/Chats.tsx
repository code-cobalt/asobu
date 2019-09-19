import { SafeAreaView, View, StyleSheet } from 'react-native'
import ChatList from '../components/ChatList'

const Chats = () => {
  return (
    <SafeAreaView style={styles.chats}>
      <ChatList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  chats: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

export default Chats
