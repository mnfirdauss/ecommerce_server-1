const request = require("supertest")
const app = require("../app")
const { User } = require('../models')

const user_data = {
	email: 'admin@mail.com',
	password: '1234'
}

describe('Login Test', () => {
	it('should send an object with key access_token (success case)', (done) => {
		request(app)
			.post('/users/login')
			.send(user_data)
			.end((err, res) => {
				if (err) {
					throw err;
				} else {
					expect(res.status).toBe(200);
					expect(res.body).toHaveProperty('access_token', expect.any(String))
					done()
				}
			})
	}, 10000)

	it('failed case: Invalid email', (done) => {
		request(app)
			.post('/users/login')
			.send({ email: 'adam@mail.com', password: '1234' })
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(400)
					expect(res.body).toHaveProperty('error', 'Invalid email/password')
					done()
				}
			})
	}, 10000)

	it('failed case: Invalid password', (done) =>{
		request(app)
			.post('/users/login')
			.send({ email: 'admin@mail.com', password: '0987' })
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(400)
					expect(res.body).toHaveProperty('error', 'Invalid email/password')
					done()
				}
			})
	}, 10000)

	it('failed case: tidak memasukkan email dan password', (done) => {
		request(app)
			.post('/users/login')
			// .send({ email: '', password: '' })
			.send()
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(400)
					expect(res.body).toHaveProperty('error', 'Please input email and password')
					done()
				}
			})
	}, 10000)
})