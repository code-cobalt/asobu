import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import {
  sendHangoutRequestQuery,
  acceptHangoutRequestQuery
} from '../queries/hangouts'

export const sendHangoutRequest = async (currentUserEmail, toUserEmail) => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(sendHangoutRequestQuery),
    variables: {
      currentUserEmail,
      toUserEmail
    }
  })
  return res.status
}

export const acceptHangoutRequest = async (currentUserEmail, fromUserEmail) => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(acceptHangoutRequestQuery),
    variables: {
      currentUserEmail,
      fromUserEmail
    }
  })
  return res
}
