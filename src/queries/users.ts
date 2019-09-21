import gql from 'graphql-tag'

export const registerQuery = gql`
  mutation CreateUser($newUser: NewUser!) {
    CreateUser(newUser: $newUser) {
      id
      first_name
      last_name
      email
      phone_number
      profile_photo
      interests
      exp
      lvl
      events {
        event_id
        is_creator
      }
      stats {
        funny
        fun
        intellectual
        interesting
        kind
        therapeutic
      }
      chats {
        chat_id
        participants {
          first_name
          profile_photo
          email
        }
      }
      sent_hangout_requests {
        first_name
        email
        profile_photo
        equipped_badges
      }
      received_hangout_requests {
        first_name
        email
        profile_photo
        equipped_badges
      }
      accepted_hangouts {
        first_name
        email
        profile_photo
        equipped_badges
      }
      ongoing_hangouts {
        hangout_id
        participants {
          first_name
          email
          profile_photo
          equipped_badges
        }
      }
      blocked_users
      blocked_by_users
      equipped_badges
      token
      pending_reviews {
        first_name
        email
        profile_photo
      }
      longitude
      latitude
      is_active
    }
  }
`

export const loginQuery = gql`
  query Login($userEmail: String!, $userPassword: String!) {
    Login(userEmail: $userEmail, userPassword: $userPassword) {
      id
      first_name
      last_name
      email
      phone_number
      profile_photo
      interests
      exp
      lvl
      events {
        event_id
        is_creator
      }
      stats {
        funny
        fun
        intellectual
        interesting
        kind
        therapeutic
      }
      chats {
        chat_id
        participants {
          first_name
          profile_photo
          email
        }
      }
      sent_hangout_requests {
        first_name
        email
        profile_photo
        equipped_badges
      }
      received_hangout_requests {
        first_name
        email
        profile_photo
        equipped_badges
      }
      accepted_hangouts {
        first_name
        email
        profile_photo
        equipped_badges
      }
      ongoing_hangouts {
        hangout_id
        participants {
          first_name
          email
          profile_photo
          equipped_badges
        }
      }
      blocked_users
      blocked_by_users
      equipped_badges
      token
      pending_reviews {
        first_name
        email
        profile_photo
      }
      longitude
      latitude
      is_active
    }
  }
`

export const getUserLimitedQuery = gql`
  query User($userEmail: String!) {
    User(userEmail: $userEmail) {
      first_name
      email
      profile_photo
      interests
      equipped_badges
    }
  }
`

export const getUsersQuery = gql`
  query {
    Users {
      id
      first_name
      last_name
      email
      phone_number
      profile_photo
      interests
      exp
      lvl
      equipped_badges
      imei
      longitude
      latitude
      is_active
      token
    }
  }
`

export const updateProfileQuery = gql`
  mutation UpdateUser($userEmail: String!, $updatedUser: UpdatedUser!) {
    UpdateUser(userEmail: $userEmail, updatedUser: $updatedUser) {
      id
      first_name
      last_name
      email
      phone_number
      profile_photo
      interests
      exp
      lvl
      events {
        event_id
        is_creator
      }
      chats {
        chat_id
        participants {
          first_name
          profile_photo
          email
        }
      }
      sent_hangout_requests {
        first_name
        email
        profile_photo
      }
      received_hangout_requests {
        first_name
        email
        profile_photo
      }
      equipped_badges
      token
    }
  }
`

export const blockUserQuery = gql`
  mutation BlockUser(
    $currentUserEmail: String!
    $blockedUserEmail: String!
    $chatId: Int!
  ) {
    BlockUser(
      currentUserEmail: $currentUserEmail
      blockedUserEmail: $blockedUserEmail
      chatId: $chatId
    )
  }
`

export const unblockUserQuery = gql`
  mutation UnblockUser($currentUserEmail: String!, $blockedUserEmail: String!) {
    UnblockUser(
      currentUserEmail: $currentUserEmail
      blockedUserEmail: $blockedUserEmail
    )
  }
`

export const reviewUserQuery = gql`
  mutation ReviewUser(
    $currentUserEmail: String!
    $reviewedUserEmail: String!
    $newStats: StatsInput!
  ) {
    ReviewUser(
      currentUserEmail: $currentUserEmail
      reviewedUserEmail: $reviewedUserEmail
      newStats: $newStats
    ) {
      funny
      intellectual
      fun
      kind
      therapeutic
      interesting
    }
  }
`

export const addExpQuery = gql`
  mutation AddExp($userEmail: String!, $points: Int) {
    AddExp(userEmail: $userEmail, points: $points)
  }
`

export const getUserEquippedBadgesQuery = gql`
  query User($userEmail: String!) {
    User(userEmail: $userEmail) {
      equipped_badges
    }
  }
`

export const setUserLocationQuery = gql`
  mutation UpdateUser($userEmail: String!, $updatedUser: UpdatedUser!) {
    UpdateUser(userEmail: $userEmail, updatedUser: $updatedUser) {
      latitude
      longitude
      isActive
    }
  }
`
