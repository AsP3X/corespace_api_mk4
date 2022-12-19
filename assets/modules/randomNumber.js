const crypto = require('crypto');

// create a random number generator function that returns a random number between 100000 and 999999 (inclusive) and doesn't use Math.random()
function generateRandomNumber(min, max) {
  return crypto.randomBytes(4).readUInt32LE(0) % (max - min + 1) + min;
}

// export the function
module.exports = generateRandomNumber;