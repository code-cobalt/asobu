import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import {
  getEventsQuery,
  getEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
  attendEventQuery,
  unattendEventQuery,
  createEventCommentQuery,
  deleteEventCommentQuery
} from '../queries/events'

const getEvents = () => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(getEventsQuery)
    })
    dispatch({
      type: 'GET_EVENTS',
      events: res.data.data.Events
    })
  }
}

const createEvent = async newEvent => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(createEventQuery),
    variables: newEvent
  })
  return dispatch => {
    dispatch({
      type: 'CREATE_EVENT',
      newEvent
    })
  }
}

const updateEvent = async () => {}

const deleteEvent = async () => {}

const attendEvent = (eventId, user) => {
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

const unattendEvent = (eventId, userEmail) => {
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

const createEventComment = async () => {}

const deleteEventComment = async () => {}

export {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  unattendEvent,
  createEventComment,
  deleteEventComment
}
