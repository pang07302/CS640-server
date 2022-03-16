const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.port || 8000
const app = express()

const url = ''

app.listen(PORT, () => {
    console.log(`Server listening or port ${PORT}`)
})