const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

const product_data = {
	name: 'naiki shoes',
	image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/zxgvvbflzw529uvanto4/air-zoom-structure-22-womens-running-shoe-1zf2mf.jpg',
	price: 1000000,
	stock: 2
}

let access_token

beforeAll((done) => {
	request(app)
		.post('/users/login')
		.send({ email: 'admin@mail.com', password: '1234' })
		.then(res => {
			access_token = res.body.access_token
			done()
		})
}, 10000)

afterAll((done) => {
	queryInterface.bulkDelete('Products')
	done()
})

// describe('create product test', () => {
// 	it('Success test', (done) => {
// 		request(app)
// 			.post('/products')
// 			.set('access_token', access_token)
// 			.send(product_data)
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(201)
// 					expect(res.body).toHaveProperty('name', product_data.name)
// 					expect(res.body).toHaveProperty('image_url', product_data.image_url)
// 					expect(res.body).toHaveProperty('price', product_data.price)
// 					expect(res.body).toHaveProperty('stock', product_data.stock)
// 					done()
// 				}
// 			})
// 	}, 15000)

// 	it('Failed test: no access token', (done) => {
// 		request(app)
// 			.post('/products')
// 			.send(product_data)
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(401)
// 					expect(res.body).toHaveProperty('error', 'Authentication Failed')
// 					done()
// 				}
// 			})
// 	}, 10000)

// 	it('Failed test: not authorized', (done) => {
// 		request(app)
// 			.post('/products')
// 			.set('access_token', )
// 			.send(product_data)
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(401)
// 					expect(res.body).toHaveProperty('error', 'Not Authorized')
// 					done()
// 				}
// 			})
// 	})

// 	it("Failed test: field null", (done) => {
// 		request(app)
// 			.post("/products")
// 			.set('access_token', access_token)
// 			.send({ name: '', image_url: '', price: '', stock: '' })
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(400)
// 					expect(res.body).toHaveProperty('error', 'name, image_url, price, stock are required')
// 					done()
// 				}
// 			})
// 	})

// 	it("Failed test: price and stock minus", (done) => {
// 		request(app)
// 			.post("/products")
// 			.set('access_token', access_token)
// 			.send({ name: product_data.name, image_url: product_data.image_url, price: -10000, stock: -2 })
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(400)
// 					expect(res.body).toHaveProperty('error', 'price must be higher than 0, stock must be higher than 0s')
// 					done()
// 				}
// 			})
// 	})
// })

// describe("Read product test", () => {
// 	it("Success test", (done) => {
// 		request(app)
// 			.get("/products")
// 			.set("access_token", access_token)
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(200)
// 					expect(res.body[0]).toHaveProperty('id', expect.any(Number))
// 					expect(res.body[0]).toHaveProperty('name', expect.any(String))
// 					expect(res.body[0]).toHaveProperty('image_url', expect.any(String))
// 					expect(res.body[0]).toHaveProperty('price', expect.any(Number))
// 					expect(res.body[0]).toHaveProperty('stock', expect.any(Number))
// 					done()
// 				}
// 			})
// 	})
// })

// describe("update product test", () => {
// 	it("Success test", (done) => {
// 		request(app)
// 			.put("/products/16")
// 			.set('access_token', access_token)
// 			.send({
// 				name: 'test',
// 				image_url: 'www.google.com',
// 				price: 10,
// 				stock: 2,
// 			})
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(200)
// 					expect(res.body).toHaveProperty('id', expect.any(Number))
// 					expect(res.body).toHaveProperty('name', expect.any(String))
// 					expect(res.body).toHaveProperty('image_url', expect.any(String))
// 					expect(res.body).toHaveProperty('price', expect.any(Number))
// 					expect(res.body).toHaveProperty('stock', expect.any(Number))
// 					done()
// 				}
// 			})
// 	})

// 	it("Failed test: no access token", (done) => {
// 		request(app)
// 			.put("/products/1")
// 			.send({
// 				name: 'test',
// 				image_url: 'www.google.com',
// 				price: 20,
// 				stock: 1,
// 			})
// 			.end((err, res) => {
// 				if (err) {
// 					throw err
// 				} else {
// 					expect(res.status).toBe(401)
// 					expect(res.body).toHaveProperty('error', 'Authentication Failed')
// 					done()
// 				}
// 			})
// 	})

// 	// it ("Failed test: not admin's access token", (done) => {
// 	// 	request(app)
// 	// 		.put("/products/1")
// 	// 		.set("access_token", 'abs07chn0u1he1723h1')
// 	// 		.send({
// 	// 			name: 'test',
// 	// 			image_url: 'www.google.com',
// 	// 			price: 20,
// 	// 			stock: 1,
// 	// 		})
// 	// 		.end((err, res) => {
// 	// 			if (err) {
// 	// 				throw err
// 	// 			} else {
// 	// 				expect(res.status).toBe(401)
// 	// 				expect(res.body).toHaveProperty('error', 'Not Authorized')
// 	// 				done()
// 	// 			}
// 	// 		})
// 	// })
// })

describe("Delete test", () => {
	it("Success test", (done) => {
		request(app)
			.delete("/products/16")
			.set('access_token', access_token)
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(200)
					expect(res.body).toHaveProperty('message', 'Delete success')
					done()
				}
			})
	})

	it("Failed case: no access token", (done) => {
		request(app)
			.delete("/products/18")
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(401)
					expect(res.body).toHaveProperty('error', 'Authentication Failed')
					done()
				}
			})
	})

	// it("Failed case: not admin access token", (done) => {
	// 	request(app)
	// 		.delete("/product/1")
	// 		.set('access_token', 'byvhb032hefuh2g38fg23by8')
	// 		.end((err, res) => {
	// 			if (err) {
	// 				throw err
	// 			} else {
	// 				expect(res.status).toBe(401)
	// 				expect(res.body).toHaveProperty('error', 'Not Authorized')
	// 				done()
	// 			}
	// 		})
	// })
})