import request from 'supertest'
import { app } from '@/app'
import { makeUser } from '@/test/factories/make-user'

describe('POST /login', () => {
  it('should be able to authenticate', async () => {
    const { user, passwordBeforeHash } = await makeUser()

    const response = await request(app.server).post('/login').send({
      email: user.email,
      password: passwordBeforeHash,
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should return 400 when wrong password is passed', async () => {
    const { user } = await makeUser()

    const response = await request(app.server).post('/login').send({
      email: user.email,
      password: '123456',
    })

    expect(response.status).toBe(400)
  })
})
