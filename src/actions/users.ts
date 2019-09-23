import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import arrayHashConversion from 'array-hash-conversion'

import {
  loginQuery,
  getUserLimitedQuery,
  getUserQuery,
  getUsersQuery,
  updateProfileQuery,
  blockUserQuery,
  unblockUserQuery,
  reviewUserQuery,
  addExpQuery,
  registerQuery,
  getUserEquippedBadgesQuery,
  updateUserTokenQuery
} from '../queries/users'
import { AsyncStorage } from 'react-native'

export const registerUser = newUser => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(registerQuery),
      variables: {
        newUser
      }
    })
    const user = res.data.data.CreateUser
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.last_name
      })
    )
    dispatch({ type: 'SET_USER', user })
  }
}

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
        email: user.email,
        passwordHash: user.password_hash,
        profilePhoto: user.profile_photo
      })
    )
    dispatch({ type: 'SET_USER', user })
  }
}

export const getUser = async userEmail => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(getUserQuery),
    variables: {
      userEmail
    }
  })
  return res.data.data.User
}

export const logOut = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }
}

export const getUserLimited = async userEmail => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(getUserLimitedQuery),
    variables: {
      userEmail
    }
  })
  return res.data.data.User
}

export const getUsers = (currentUserEmail, [...hiddenUsers], [...hangouts]) => {
  //hiddenUsers is an array of all the user emails who the current user has blocked or been blocked by or has already accepted/received hangouts with.
  //don't return any users in this array
  //create a hashmap to reduce time complexity
  const hangoutUsers = []
  //get nested emails out of hangout objects and add them to users who should be hidden from results
  for (const hangout of hangouts) {
    hangout.participants.forEach(participant =>
      hangoutUsers.push(participant.email)
    )
  }
  const hiddenUsersObj = arrayHashConversion(
    [...hiddenUsers, ...hangoutUsers],
    null,
    1
  )

  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(getUsersQuery)
    })
    //don't show current user, blocked/blocked by users, or users with current hangout status
    const allUsers = res.data.data.Users.filter(
      user => !hiddenUsersObj[user.email] && user.email !== currentUserEmail
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

export const blockUser = (currentUserEmail, blockedUserEmail, chatId) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(blockUserQuery),
      variables: {
        currentUserEmail,
        blockedUserEmail,
        chatId
      }
    })
    dispatch({ type: 'BLOCK_USER', blockedUserEmail, chatId })
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

export const reviewUser = (currentUserEmail, reviewedUserEmail, newStats) => {
  return async dispatch => {
    await axios.post(`${apiUrl}/graphql`, {
      query: print(reviewUserQuery),
      variables: {
        currentUserEmail,
        reviewedUserEmail,
        newStats
      }
    })
    dispatch({ type: 'END_REVIEW' })
  }
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
    dispatch({ type: 'ADD_EXP', exp: exp.data.data.AddExp })
  }
}

export const getUserEquippedBadges = async userEmail => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(getUserEquippedBadgesQuery),
    variables: {
      userEmail: userEmail
    }
  })
  return res.data.data.User.equipped_badges
}

export const updateUserToken = async (userEmail, token) => {
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(updateUserTokenQuery),
    variables: {
      userEmail,
      updatedUser: { token }
    }
  })
  return res.data.data.UpdateUser.token
}
