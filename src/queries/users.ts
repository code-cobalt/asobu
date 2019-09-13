import gql from 'graphql-tag'

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
      imei
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
      stats {
        funny
        intellectual
        fun
        kind
        therapeutic
        interesting
      }
      imei
    }
  }
`
