const express = require('express')
const app = express()
require('dotenv').config();
require('./db/db')
const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Working')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})