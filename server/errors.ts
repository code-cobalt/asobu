import { createError } from 'apollo-errors'

const errors = {
  InvalidEmailError: createError('InvalidEmailError', {
    message: 'No user account associated with that email address found.'
  }),
  InvalidPasswordError: createError('InvalidPasswordError', {
    message: 'Invalid password.'
  }),
  InvalidPinError: createError('InvalidPinError', {
    message: 'Invalid PIN.'
  }),
  InvalidCredentialsError: createError('InvalidCredentialsError', {
    message: 'Invalid credentials'
  }),
  InvalidEventError: createError('InvalidEventError', {
    message: 'Invalid event.'
  }),
  InvalidEventIdError: createError('InvalidEventIdError', {
    message: 'No event with that id found.'
  }),
  InvalidCommentError: createError('InvalidCommentError', {
    message: 'Invalid comment.'
  }),
  InvalidCommentIdError: createError('InvalidCommentIdError', {
    message: 'This event does not have any comments with the provided id.'
  }),
  InvalidMessageError: createError('InvalidMessageError', {
    message: 'Invalid message.'
  })
}

export default errors
