const fs = require('fs');
const paraMap = require('parametermapper');

const randomNum = require('./assets/utils/randomNum');

const args = process.argv.slice(2);
const parameterMap = paraMap.convertArgs2Map(args);

console.log(parameterMap);

let testType = 'unit';
let testRounds = 1;
let testFile = 'test.txt';

// check if parameterMap contains the parameter '-t'
if (parameterMap['-t']) {
  // get the value of the parameter '-t'
  testType = parameterMap['-t'];
}

// check if the parameterMap contains the parameter '-r'
if (parameterMap['-r']) {
  // get the value of the parameter '-r'
  testRounds = parameterMap['-r'];
}

if (parameterMap['-f']) {
  // get the value of the parameter '-f'
  testFile = parameterMap['-f'];
}

function runUnitTests(rounds, resultFile) {
  const randomNumbers = [];

  for (let i = 0; i < rounds; i++) {
    const randomNumber = randomNum.generateInRange(1000000, 9999999);
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

if (testType === 'unit') {
  const randomNumbers = runUnitTests(testRounds, testFile);
  console.log(testType, testRounds, testFile);
  console.log(randomNumbers);
}