const { Cart, Product } = require('../models')

class CastController {
	static async addCart (req, res, next) {
		const { ProductId } = req.body
		const UserId = req.loggedIn

		try {
			const payload = {
				ProductId, UserId, quantity: 1, status: false
			}

			const cart = await Cart.findOne( { where: { ProductId, UserId, status: false } })

			if (!cart) {
				const newCart = await Cart.create(payload)
				res.status(201).json(newCart)
			} else {
				const updateCart = await Cart.update({ quantity: cart.quantity + 1 }, { where: { ProductId, UserId, status: false }, returning: true })
				res.status(200).json(updateCart[1])
			}
		} catch(err) {
			next(err)
		}
	}

	static async getCart (req, res, next) {
		const UserId = req.loggedIn

		try {
			const carts = await Cart.findAll({ where: { UserId }, include: ['Product'], order: [['createdAt','ASC']] })
			res.status(200).json(carts)
		} catch(err) {
			next(err)
		}
	}

	static async updateCart (req, res, next) {
		const { quantity } = req.body
		const { id } = req.params

		try {
			const cartUpdate = await Cart.update({ quantity }, { where: { id }, returning: true })
			res.status(200).json(cartUpdate[1])
		} catch(err) {
			next(err)
		}
	}

	static async deleteCart (req, res, next) {
		const { id } = req.params

		try {
			const deletedCart = await Cart.destroy({ where: { id } })
			res.status(200).json(deletedCart)
		} catch(err) {
			next(err)
		}
	}
}

module.exports = CastController