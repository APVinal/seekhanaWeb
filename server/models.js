const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  test: {type: String, required:true}
});

const Test = mongoose.model('Test', testSchema);

module.exports = {Test};