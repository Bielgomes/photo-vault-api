import request from 'supertest'
import { app } from '@/app'

describe('POST /users', () => {
  it('should register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(201)
  })

  it('should return 409 when email already exists', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Deer',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(409)
  })

  it('should return 400 when email is invalid', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Deer',
      email: 'johndoe@.com',
      password: '123456',
    })

    expect(response.status).toEqual(400)
  })
})
