import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import { getChatQuery, createMessageQuery } from '../queries/chats'

export const getChat = chatId => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(getChatQuery),
      variables: { chatId }
    })
    // necessary in case a new chat is Null and has no messages
    let messages
    res.data.data.Chat
      ? (messages = res.data.data.Chat.messages)
      : (messages = [])
    dispatch({
      type: 'SHOW_CHAT',
      messages,
      chatId
    })
  }
}

export const createMessage = message => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(createMessageQuery),
      variables: { message }
    })
    dispatch({ type: 'CREATE_MESSAGE', message: res.data.data.CreateMessage })
  }
}
