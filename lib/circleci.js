const axios = require('axios')
const { CIRCLE_API_TOKEN, CIRCLE_BUILD_ENDPOINT } = process.env

const deploy = async branch => {
  await axios.post(`${CIRCLE_BUILD_ENDPOINT}?circle-token=${CIRCLE_API_TOKEN}`, { branch })
}

module.exports = {
  deploy
}
