import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import {
  getEventsQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
  attendEventQuery,
  unattendEventQuery,
  createCommentQuery,
  deleteCommentQuery
} from '../queries/events'

export const getEvents = () => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(getEventsQuery)
    })
    //only show events that haven't finished yet
    const events = res.data.data.Events.filter(
      event => new Date(event.end) > new Date()
    )
    dispatch({
      type: 'GET_EVENTS',
      events
    })
  }
}

export const createEvent = async newEvent => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(createEventQuery),
    variables: newEvent
  })
  return dispatch => {
    dispatch({
      type: 'CREATE_EVENT',
      newEvent: res.data.data.CreateEvent
    })
  }
}

export const updateEvent = (eventId, updatedEvent) => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(updateEventQuery),
      variables: {
        eventId,
        updatedEvent
      }
    })
    dispatch({ type: 'UPDATE_EVENT', updatedEvent: res.data.data.UpdateEvent })
  }
}

export const deleteEvent = eventId => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(deleteEventQuery),
      variables: {
        eventId
      }
    })
    dispatch({ type: 'DELETE_EVENT', eventId })
  }
}

export const attendEvent = (eventId, user) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(attendEventQuery),
      variables: {
        eventId,
        user: {
          first_name: user.first_name,
          email: user.email,
          profile_photo: user.profile_photo
        }
      }
    })
    dispatch({ type: 'ATTEND_EVENT' })
  }
}

export const unattendEvent = (eventId, userEmail) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(unattendEventQuery),
      variables: {
        eventId,
        userEmail
      }
    })
    dispatch({ type: 'UNATTEND_EVENT' })
  }
}

export const createComment = (eventId, newComment) => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(createCommentQuery),
      variables: {
        eventId,
        newComment
      }
    })
    dispatch({
      type: 'CREATE_COMMENT',
      newComment: res.data.data.CreateComment
    })
  }
}

export const deleteComment = (eventId, commentId) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(deleteCommentQuery),
      variables: {
        eventId,
        commentId
      }
    })
    dispatch({ type: 'DELETE_COMMENT', commentId })
  }
}
