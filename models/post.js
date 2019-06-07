const db = require('../config/db');
const Schema = require('mongoose').Schema;

// Create schema
const PostSchema = new Schema({
  'title': String,
  'text': String,
  'status': {
    type: String,
    enum : ['draft', 'private', 'public'],
    default: 'draft'
  }
  // TODO: Future steps: add author
}, { timestamps: true });

// Create model if not exists
module.exports = db.model('post', PostSchema);
