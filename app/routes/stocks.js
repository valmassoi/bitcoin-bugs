const stockRouter = require('express').Router()
const axios = require('axios')
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()


function getStockData(asset, callback) {
  const { API_KEY } = process.env
  let quandlUrl = ''
  if (asset === 'BITCOIN')
    quandlUrl = `https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=${API_KEY}`
  else
    quandlUrl = `https://www.quandl.com/api/v3/datasets/LBMA/${asset}.json?api_key=${API_KEY}`
  // ?api_key=ypdhPoFqf4vqzfzndKiz&end_date=2016-08-18
  axios.get(quandlUrl).then(result => {
    const { data } = result.data.dataset
    const abstraction = []
    data.forEach((array) =>
      abstraction.push(
        array.filter(value => {
          return (value === array[0] || value === array[1])
        }).map((value) => {
          if (value === array[0])
            return new Date(value).getTime()
          if (value === array[1])
            return value
        }).slice(0, 2)
      )
    )
    callback(abstraction.reverse())
  })
  .catch((err) => {
    callback(err)
  })
}

stockRouter.get('/:asset', (req, res) => {
  const { asset } = req.params
  console.log('getting', asset)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  getStockData(asset, (data) => {
    res.end(JSON.stringify({ data }))
  })
})

module.exports = stockRouter
