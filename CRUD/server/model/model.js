// for creating mongoDB scheme
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  location : {
    type : String,
    required : true,
    unique : true
  },
  covid_beds : {
    type : Number
  },
  oxygen_cylinders : {
    type : Number
  },
  rates : {
    type : String
  },
  cashless_insurance : String,
  surgeon : String
})

const UserDB = mongoose.model('userdb', schema);

module.exports = UserDB;