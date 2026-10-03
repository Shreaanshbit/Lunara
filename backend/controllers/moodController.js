const MoodLog = require('../models/moodLog')

exports.createMoodLog = async (req, res, next) => {
  try {
    const mood = req.body.primaryMood ?? req.body.mood
    if (!mood) {
      return res.status(400).json({ message: 'Mood is required' })
    }

    const log = await MoodLog.create({
      user: req.user._id,
      mood,
      stressLevel: req.body.stressLevel ?? req.body.stress ?? req.body.somaticTension,
      anxietyLevel: req.body.anxietyLevel ?? req.body.anxiety,
      energyLevel: req.body.energyLevel ?? req.body.energy,
      creativeInception: req.body.creativeInception,
      somaticTension: req.body.somaticTension,
      notes: req.body.notes
    })

    res.status(201).json({ success: true, log })
  } catch (err) {
    next(err)
  }
}

exports.getMoodLogs = async (req, res, next) => {
  try {
    const logs = await MoodLog.find({ user: req.user._id }).sort({ date: -1 })
    res.json({ success: true, logs })
  } catch (err) {
    next(err)
  }
}

exports.deleteMoodLog = async (req, res, next) => {
  try {
    await MoodLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}