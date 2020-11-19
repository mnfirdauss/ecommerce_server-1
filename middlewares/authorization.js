const { User, Cart } = require("../models")

class authorization {
	static async userAuthorization (req, res, next) {
		try {
			const user = await User.findByPk(req.loggedIn)
	
			if (user.role !== 'admin') {
				throw { msg: 'Not Authorized', status: '401' }
			} else {
				next()
			}
		} catch (err) {
			next(err)
		}
	}

	static async cartAuthorization (req, res, next) {
		const { id } = req.params

		try {
			const cart = await Cart.findByPk(id)
			if (!req.loggedIn === cart.UserId) {
				throw { msg: 'Not Authorized', status: '401' }
			} else {
				next()
			}
		} catch(err) {
			next(err)
		}
	}

}

module.exports = authorization