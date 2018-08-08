const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('./aws/services')
const getPrices = require('./aws/getPrices')
const axios = require('axios')

const fs = require('fs')

const FX_ENDPOINT = 'https://api.aoikujira.com/kawase/json/usd'

getPrices(pricing, services)
  .then(data => {
    fs.writeFileSync('./tmp/payload.json', JSON.stringify(data))
  })
  .catch(err => console.log(err))

axios
  .get(FX_ENDPOINT)
  .then(function (response) {
    console.log(response.data.JPY)
  })
  .catch(function (error) {
    console.log(error)
  })
