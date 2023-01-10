const crypto = require('crypto');

class Token {
  constructor(tokenType, dataset) {
    this._token = null;
    this.tokenType = tokenType;
    this.dataset = dataset;
  }

  getToken() {
    return this._token;
  }

  getDataset() {
    return this.dataset;
  }

  createHashedToken(dataset) {
    const hash = crypto.createHash('sha256');
    // convert dataset to JSON string
    const jsonString = JSON.stringify(dataset);
    // update the hash with the JSON string
    hash.update(jsonString);
    return hash.digest('hex');
  }

  generateApplicationToken() {
    const preToken = this.createHashedToken(this.dataset);
    return `app_${preToken}`;
  }

  generateUserToken() {
    const preToken = this.createHashedToken(this.dataset);
    return `user_${preToken}`;
  }

  generate() {
    if (this.tokenType === "application") {
      this._token = this.generateApplicationToken();
    } else if (this.tokenType === "user") {
      this._token = this.generateUserToken();
    }
  }
}

module.exports = Token;