import { createError } from 'apollo-errors'
import User from '../components/User'

//example of what an invalid graphql request will return:

// bad query example...
// query {
//     User(userEmail: "thisemaildoesnotexist") {
//         first_name
//         lastname
//     }
// }
//
//this would return...
// {
//     "errors": [
//       {
//         "message": "No user account associated with that email address found.",
//         "name": "InvalidEmailError",
//         "time_thrown": "2019-09-08T13:56:53.787Z",
//         "data": {any specified error data goes here...}
//       }
//     ],
//     "data": {
//       "User": null
//     }
//   }

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
