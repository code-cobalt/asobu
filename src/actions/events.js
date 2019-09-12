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

const getEvent = async () => {}

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
  // return res
}

const updateEvent = async () => {}

const deleteEvent = async () => {}

const attendEvent = async (eventId, user) => {
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
}

const unattendEvent = async (eventId, userEmail) => {
  await axios.post(`${apiUrl}/graphql`, {
    query: print(unattendEventQuery),
    variables: {
      eventId,
      userEmail
    }
  })
}

const createEventComment = async () => {}

const deleteEventComment = async () => {}

export {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  unattendEvent,
  createEventComment,
  deleteEventComment
}
