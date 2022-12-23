const mongoose = require('mongoose');

class MongoDB {
  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error(error);
    }
  }

  async create(model, data) {
    try {
      const result = await model.create(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async find(model, query) {
    try {
      const result = await model.find(query);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async findOneAndUpdate(model, query, data) {
    try {
      const result = await model.findOneAndUpdate(query, data, { new: true });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOne(model, query) {
    try {
      const result = await model.deleteOne(query);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MongoDB;