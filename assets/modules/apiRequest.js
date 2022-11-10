const axios = require('axios');
const Logger = require('./logger');

const logger = new Logger("testing/module/apiRequest");

class ApiRequest {
  constructor (url) {
    this.url = url
    this.body = {}
  }

  async get () {
    return axios.get(this.url)
      .then(response => {
        return response.data
      })
      .catch(error => {
        logger.error(error)
      })
  }

  async post () {
    if (!this.body) {
      logger.error("No body provided for POST request")
      throw new Error('No body provided')
    }
    return axios.post(this.url, this.body)
      .then(response => {
        return response.data
      })
      .catch(error => {
        logger.error(error)
      })
  }
}

module.exports = ApiRequest