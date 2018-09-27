const axios = require('axios')
const { CIRCLE_API_KEY, CIRCLE_DEPLOY_ENDPOINT } = process.env

const deploy = async branch => {
  await axios.post(`${CIRCLE_DEPLOY_ENDPOINT}?circle-token=${CIRCLE_API_KEY}`, { branch })
}

module.exports = {
  deploy
}
