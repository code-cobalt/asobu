const chai = require('chai')
const expect = chai.expect
const url = 'http://localhost:3000'
const request = require('supertest')(url)

describe('GraphQL Queries', () => {
  it('should return all Users', done => {
    const usersQuery = {
      query: `query {
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
                    chats {
                        chat_id
                        participants {
                          first_name
                          email
                          profile_photo
                        }
                    }
                    events {
                        event_id
                        is_creator
                    }
                    imei
                }
            }`
    }
    request
      .post('/graphql')
      .send(usersQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body.data.Users)).to.be.true
        done()
      })
  })
  it('should return one User by email', done => {
    const testUser = {
      first_name: 'Jerry',
      last_name: 'Berry',
      email: 'jberr@email.com',
      phone_number: '+18186662312',
      profile_photo:
        'https://cdn.thedailymash.co.uk/wp-content/uploads/20190324205229/40-something-man-2-1.jpg'
    }
    const userQuery = {
      query: `query {
            User(userEmail: "jberr@email.com") {
                first_name
                last_name
                email
                phone_number
                profile_photo
            }
        }`
    }
    request
      .post('/graphql')
      .send(userQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.User).to.be.an('object')
        expect(res.body.data.User).to.deep.equal(testUser)
        done()
      })
  })
})
