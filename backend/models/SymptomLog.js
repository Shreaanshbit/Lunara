const mongoose = require('mongoose')

const symptomLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ['physical', 'digestive', 'cervical', 'cognitive']
    },
    severity: {
      type: Number,
      min: 1,
      max: 10
    },
    mood: String,
    symptoms: {
      type: [String],
      default: undefined
    },
    intensity: {
      type: Number,
      min: 1,
      max: 5
    },
    source: {
      type: String,
      default: 'chat'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('SymptomLog', symptomLogSchema)