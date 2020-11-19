const { Product } = require("../models")

class ProductController {
	static async create (req, res, next) {
		const { name, image_url, price, stock } = req.body
		
		try {
			const payload = {
				name, image_url, price, stock
			}
					
			if (!name || !image_url || !price || !stock) {
				throw { msg: 'name, image_url, price, stock are required', status: 400 }
			}

			const product = await Product.create(payload)
			res.status(201).json(product)
		} catch (err) {
			next(err)
		}
	}

	static async read (req, res, next) {
		try {
			const products = await Product.findAll()
			res.status(200).json(products)
		} catch (err) {
			next(err)
		}
	}

	static async update (req, res, next) {
		const { name, image_url, price, stock } = req.body
		const { id } = req.params

		try {
			const payload = {
				name, image_url, price, stock
			}

			if (!name || !image_url || !price || !stock) {
				throw { msg: 'name, image_url, price, stock are required', status: 400 }
			}

			const updatedProduct = await Product.update(payload, { where: { id }, returning: true })
			res.status(200).json(updatedProduct[1][0])
		} catch (err) {
			next(err)
		}
	}

	static async delete (req, res, next) {
		const { id } = req.params

		try {
			const deletedProduct = await Product.destroy({ where: { id } })
			res.status(200).json({ message: 'Delete success' })
		} catch (err) {
			next(err)
		}
	}
}

module.exports = ProductController