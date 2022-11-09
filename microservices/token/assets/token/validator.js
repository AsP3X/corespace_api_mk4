const JWT = require('jsonwebtoken');

class TokenVerifier {
  constructor(token) {
    this.token = token;
    this.id = '';
    this.verified = false;
  }

  setId(id) {
    this.id = id;
  }

  verify() {
    try {
      const decoded = JWT.verify(this.token, `${this.id}_secret`);
      this.verified = true;
    } catch (err) {
      this.verified = false;
    }
  }

  get() {
    return this.verified;
  }

}

module.exports.TokenVerifier = TokenVerifier;