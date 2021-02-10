const request = require('supertest')
const app = require('../app')

test('Should login the user', async () => {
  await request(app).post('/auth/login').send({
    email: 'student@gmail.com',
    password: 'student'
  }).expect({
    status: 200,
    user: {
      userType: 'User',
      _id: '60235ba2d6b67714a4b0f772',
      firstName: 'Janaka',
      lastName: 'Siriwardene',
      email: 'student@gmail.com',
      password: '$2b$10$mDEb7PnOMNmKIu1E7dAs.eTRdpqXq7p7kCnw77JhZRiVSvq31.vj2',
      createdAt: '2021-02-10T04:05:54.579Z',
      updatedAt: '2021-02-10T06:26:48.724Z',
      userId: 1016,
      __v: 0
    }
  })
})

test('Should not login the user', async () => {
  await request(app).post('/auth/login').send({
    email: 'student@gmail.com',
    password: 'student1'
  }).expect({
    status: 401,
    message: 'Incorrect email or password! Please double check and try again.'
  })
})
