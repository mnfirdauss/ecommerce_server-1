const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication (req, res, next) {
	const { access_token } = req.headers
	
	try {
		if (!access_token) {
			throw { msg: 'Authentication Failed', status: 401 }
		} else {
			const decoded = verifyToken(access_token)
			const user = await User.findOne({ where: { email: decoded } })

			if (!user) {
				throw { msg: 'Authentication Failed', status: 401 }
			} else {
				req.loggedIn = user.id
				next()
			}
		}
	} catch (err) {
		next(err)
	}
}

module.exports = authentication