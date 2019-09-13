import gql from 'graphql-tag'

export const getEventsQuery = gql`
  query {
    Events {
      id
      name
      description
      cover_photo
      creator {
        first_name
        email
        profile_photo
      }
      start
      end
      location
      limit
      tags
      attendees {
        first_name
        email
        profile_photo
      }
      comments {
        id
        content
        timestamp
        from {
          first_name
          email
          profile_photo
        }
      }
    }
  }
`

export const getEventQuery = gql`
  query Event($eventId: String!) {
    Event(eventId: $eventId) {
      id
      name
      description
      cover_photo
      creator {
        first_name
        email
        profile_photo
      }
      start
      end
      location
      limit
      tags
      attendees {
        first_name
        email
        profile_photo
      }
      comments {
        id
      }
    }
  }
`

export const createEventQuery = gql`
  mutation CreateEvent($newEvent: NewEvent!) {
    CreateEvent(newEvent: $newEvent) {
      id
      name
      description
      cover_photo
      creator {
        first_name
        email
        profile_photo
      }
      start
      end
      location
      limit
      tags
    }
  }
`

export const updateEventQuery = gql`
  mutation UpdateEvent($eventId: String!, $updatedEvent: UpdatedEvent!) {
    UpdateEvent(eventId: $eventId, updatedEvent: $updatedEvent) {
      id
      name
      description
      cover_photo
      creator {
        first_name
        email
        profile_photo
      }
      start
      end
      location
      limit
      tags
      attendees {
        first_name
        email
        profile_photo
      }
      comments {
        id
        content
        timestamp
        from {
          first_name
          email
          profile_photo
        }
      }
    }
  }
`

export const deleteEventQuery = gql`
  mutation DeleteEvent($eventId: String!) {
    DeleteEvent(eventId: $eventId)
  }
`

export const attendEventQuery = gql`
  mutation AttendEvent($eventId: String!, $user: UserLimitedInput!) {
    AttendEvent(eventId: $eventId, user: $user)
  }
`

export const unattendEventQuery = gql`
  mutation UnattendEvent($eventId: String!, $userEmail: String!) {
    UnattendEvent(eventId: $eventId, userEmail: $userEmail)
  }
`

export const createCommentQuery = gql`
  mutation CreateComment($eventId: String!, $newComment: NewComment!) {
    CreateComment(eventId: $eventId, newComment: $newComment) {
      id
      from {
        email
        first_name
        profile_photo
      }
      content
      timestamp
    }
  }
`

export const deleteCommentQuery = gql`
  mutation DeleteComment($eventId: String!, $commentId: String!) {
    DeleteComment(eventId: $eventId, commentId: $commentId)
  }
`
