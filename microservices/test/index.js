const mongoose = require('mongoose');

const {DBConnector, DataManager} = require('./DBManager');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


const dbc = new DBConnector();
const dm = new DataManager(dbc, User);

dbc.createAUrl();
dbc.attemptConnection()
  .then(() => {
    console.log("Connection succeeded");
  })
  .catch((error) => {
    console.log("Connection failed");
  });

dm.create({
  _id: new mongoose.Types.ObjectId(),
  username: "John Doe",
  email: "test@test.test",
  password: "test"
})