const { urlencoded } = require("express")
const express = require("express")
const router = require("./routes/index")
const errorHandler = require("./middlewares/error-handler")
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)
app.listen(port, () => {
	console.log(`running on port: ${port}`);
})

module.exports = app