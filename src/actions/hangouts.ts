import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import {
  sendHangoutRequestQuery,
  acceptHangoutRequestQuery,
  declineHangoutRequestQuery
} from '../queries/hangouts'

export const sendHangoutRequest = (currentUserEmail, toUser) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(sendHangoutRequestQuery),
      variables: {
        currentUserEmail,
        toUserEmail: toUser.email
      }
    })
    dispatch({ type: 'SEND_REQUEST', toUser })
  }
}

export const acceptHangoutRequest = async (currentUserEmail, fromUserEmail) => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(acceptHangoutRequestQuery),
    variables: {
      currentUserEmail,
      fromUserEmail
    }
  })
  return res.data.data.AcceptHangoutRequest
}

export const declineHangoutRequest = (currentUserEmail, fromUserEmail) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(declineHangoutRequestQuery),
      variables: {
        currentUserEmail,
        fromUserEmail
      }
    })
    dispatch({ type: 'DECLINE_REQUEST', fromUserEmail })
  }
}
