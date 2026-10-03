const mongoose = require('mongoose')

const moodLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mood: {
      type: String,
      required: true
    },
    stressLevel: {
      type: Number,
      min: 0,
      max: 10
    },
    anxietyLevel: {
      type: Number,
      min: 0,
      max: 10
    },
    energyLevel: {
      type: Number,
      min: 0,
      max: 10
    },
    creativeInception: {
      type: Number,
      min: 0,
      max: 10
    },
    somaticTension: {
      type: Number,
      min: 0,
      max: 10
    },
    notes: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('MoodLog', moodLogSchema)