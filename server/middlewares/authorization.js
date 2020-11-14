const { User } = require("../models")

async function authorization (req, res, next) {
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

module.exports = authorization