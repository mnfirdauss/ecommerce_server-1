const jwt = require("jsonwebtoken")

const generateToken = payload => {
	const access_token = jwt.sign(payload, 'apaajadeh')
	return access_token
}

const verifyToken = access_token => {
	const decode = jwt.verify(access_token, 'apaajadeh')
	return decode
}

module.exports = { generateToken, verifyToken }