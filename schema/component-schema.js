const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  img_URL: {
    type: String,
    required: true
  },
  selling_price: {
    type: Number,
    required: true,
    min: 0,
  }, buying_price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  owner_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['new', 'old'],
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Components = mongoose.model('Components', componentSchema);

module.exports = Components;
