'use strict'

// https://www.quandl.com/docs/api

const express = require('express')
const http = require('http')
const routes = require('./app/routes/stocks')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(__dirname + '/public/'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.enable('trust proxy')

app.use('/api', routes)

app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('404!')
})

const port = process.env.PORT || 8081

const server = http.Server(app)
server.listen(port, () => {
  console.log('Server Running on port: ' + port)
})
