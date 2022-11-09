const JWT = require('jsonwebtoken');

class tokenGenerator {
    constructor(id) {
      this.id = id;
      this.expiresIn;
      this.token = {};
    }

    /**
     * Generate a user token
     * @param {string} id - The unique identifier for the user
     * token expires in 1 hour as per default
     */
    userToken() {
      const token = JWT.sign({ id: this.id }, `${this.id}_secret`, { expiresIn: '1h' });
      this.token = token;

      // create a string with the date and time the token will expire (1 hour)
      const date = new Date();
      date.setHours(date.getHours() + 1);
      this.expiresIn = date;
    }

    /**
     * Generate a application token
     * @param {string} id - The unique identifier for the application
     * token expires in 1 hour as per default
     */
    applicationToken() {
      const token = JWT.sign({ id: this.id }, `${this.id}_secret`, { expiresIn: '1h' });
      this.token = token;

      // create a string with the date and time the token will expire (1 hour)
      const date = new Date();
      date.setHours(date.getHours() + 1);
      this.expiresIn = date;
    }

    set(id) {
      this.id = id;
    }

    get() {
      return {
        id: this.id,
        token: this.token,
        expiresIn: this.expiresIn,
      };
    }
}

/**
 * Generate a Identifier either for a user or an application
 */
class IdentGen {
  constructor() {
    this.identifier = '';
  }

  application() {
    this.identifier = `app_token_${Math.floor(Math.random() * 1000000)}`;
  }

  user() {
    this.identifier = `user_token_${Math.floor(Math.random() * 1000000)}`;
  }

  get() {
    return this.identifier;
  }
}

module.exports.tokenGenerator = tokenGenerator;
module.exports.IdentGen = IdentGen;