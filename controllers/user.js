const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
	static async register (req, res, next) {
		const { email, password } = req.body

		try {
			const payload = {
				email, password, role: ''
			}
			const user = await User.findOne({ where: { email } })
			if (user) {
				throw { msg: 'Email has been registered', status: 401 }
			} else {
				const newUser = await User.create(payload)
				res.status(201).json({ newUser })
			}
		} catch(err) {
			next(err)
		}
	}

	static async login (req, res, next) {
		const { email, password } = req.body
		
		try {
			if (!email || !password) {
				throw { msg: 'Please input email and password', status: 400 }
      }

			const user = await User.findOne({ where: { email }})
			if (!user) {
				throw { msg: 'Invalid email/password', status: 400}
			} else if (!comparePassword(password, user.password)) {
				throw { msg: 'Invalid email/password', status: 400}
			} else {
				const access_token = generateToken(email)
				res.status(200).json({ access_token })
			}
		} catch (err) {
			next(err)
		}
	}
}

module.exports = UserController