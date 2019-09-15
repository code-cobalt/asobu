import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import {
  loginQuery,
  getUsersQuery,
  updateProfileQuery,
  blockUserQuery,
  unblockUserQuery,
  reviewUserQuery,
  addExpQuery
} from '../queries/users'
import { AsyncStorage } from 'react-native'

export const loginUser = (userEmail, userPassword) => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(loginQuery),
      variables: {
        userEmail,
        userPassword
      }
    })
    const user = res.data.data.Login
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.last_name,
        profilePhoto: user.profile_photo
      })
    )
    dispatch({ type: 'SET_USER', user })
  }
}

export const getUsers = currentUserEmail => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(getUsersQuery)
    })
    const allUsers = res.data.data.Users.filter(
      user => user.email !== currentUserEmail
    )
    dispatch({
      type: 'SET_ALL_USERS',
      allUsers
    })
  }
}

export const updateProfile = (userEmail, updatedUser) => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(updateProfileQuery),
      variables: {
        userEmail,
        updatedUser
      }
    })
    dispatch({ type: 'UPDATE_PROFILE', updatedUser: res.data.data.UpdateUser })
  }
}

export const blockUser = (currentUserEmail, blockedUserEmail) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(blockUserQuery),
      variables: {
        currentUserEmail,
        blockedUserEmail
      }
    })
    dispatch({ type: 'BLOCK_USER', blockedUserEmail })
  }
}

export const unblockUser = (currentUserEmail, blockedUserEmail) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(unblockUserQuery),
      variables: {
        currentUserEmail,
        blockedUserEmail
      }
    })
    dispatch({ type: 'UNBLOCK_USER', blockedUserEmail })
  }
}

export const reviewUser = async (currentUserEmail, reviewedUserEmail, newStats) => {
  await axios.post(`${apiUrl}/graphql`, {
    query: print(reviewUserQuery),
    variables: {
      currentUserEmail,
      reviewedUserEmail,
      newStats
    }
  })
}

export const addExp = (userEmail, points) => {
  return async dispatch => {
    const exp = await axios.post(`${apiUrl}/graphql`, {
      query: print(addExpQuery),
      variables: {
        userEmail: userEmail,
        points: points
      }
    })
    dispatch({ type: "ADD_EXP", exp: exp.data.data.AddExp })
  }
}
