const Token = require('./Token');


const dataset = {
  "userToken": "1234567890",
  "application": {
    "name": "My Application",
    "version": "1.0.0",
    "build-identifier": "b-YYMMDDHHMMSS",
    "identifier": "com.mycompany.myapp"
  }
}

const token = new Token("application", dataset);
token.generate();
console.log(token.getToken());