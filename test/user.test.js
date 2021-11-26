import supertest from 'supertest'
import app from '../server.js'
import { clearDatabase } from './databaseSetup.js'

let request = supertest(app)
describe('POST /api/users', () => {
    it('Should create a new user', async () => {
        await createUser()
    })

    /*    Clear all test data after every test.    */
    afterEach(async () => await clearDatabase())
})

describe('GET /api/users/profile', function () {
    var auth = {
        token: '',
    }
    before('creating user for profile testing', async () => {
        await createUser()
        await login(auth)
    })

    it('should require authorization', function (done) {
        request
            .get('/api/users/profile')
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err)
                done()
            })
    })

    it('should respond with JSON array', async () => {
        await request
            .get('/api/users/profile')
            .set('Authorization', 'Bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
    })

    /*    Clear all test data after ALL tests are done!.    */
    after(async () => await clearDatabase())
})

const login = async (auth) => {
    const res = await request
        .post('/api/users/login')
        .send({
            email: 'robo@example.com',
            password: '123456',
        })
        .expect(200)
    auth.token = res.body.token
}

const createUser = async () => {
    const res = await request
        .post('/api/users')
        .send({
            name: 'Robo',
            email: 'robo@example.com',
            password: '123456',
        })
        .expect(201)
}
