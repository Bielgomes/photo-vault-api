import request from 'supertest'
import { app } from '@/app'
import { makeUserAndAuthenticate } from '@/test/factories/make-user'

describe('GET /me', () => {
  it('should be able to get authenticated user profile', async () => {
    const { user, token } = await makeUserAndAuthenticate()

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    )
  })

  it('should return 401 when invalid token is passed', async () => {
    const { token } = await makeUserAndAuthenticate()

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `bearer ${token}asd`)
      .send()

    expect(response.status).toBe(401)
  })
})
