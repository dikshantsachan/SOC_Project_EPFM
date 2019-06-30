const mongoose = require('mongoose');
const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
//Will be in models file and keep track of a session
module.exports = mongoose.model('UserSession', UserSessionSchema);