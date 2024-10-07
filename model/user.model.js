const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
});
userModel.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
module.exports = mongoose.model('User', userModel);
