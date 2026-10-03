const SymptomLog = require('../models/SymptomLog')

exports.createSymptomLog = async (req, res, next) => {
  try {
    const { name, category, severity } = req.body
    const validCategories = ['physical', 'digestive', 'cervical', 'cognitive']

    if (!name?.trim() || !validCategories.includes(category)) {
      return res.status(400).json({ message: 'A symptom name and valid category are required' })
    }

    if (!Number.isInteger(severity) || severity < 1 || severity > 10) {
      return res.status(400).json({ message: 'Severity must be an integer from 1 to 10' })
    }

    const log = await SymptomLog.create({
      user: req.user._id,
      name: name.trim(),
      category,
      severity,
      source: 'manual'
    })

    res.status(201).json({ success: true, log })
  } catch (err) {
    next(err)
  }
}

exports.getSymptomLogs = async (req, res, next) => {
  try {
    const logs = await SymptomLog.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ success: true, logs })
  } catch (err) {
    next(err)
  }
}

exports.deleteSymptomLog = async (req, res, next) => {
  try {
    await SymptomLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

exports.confirmSymptoms = async (req, res, next) => {
  try {
    const { symptoms, mood, intensity } = req.body

    const log = await SymptomLog.create({
      user: req.user._id,
      symptoms,
      mood,
      intensity: Math.min(5, Math.max(1, intensity))
    })

    res.status(201).json({
      success: true,
      log
    })
  } catch (err) {
    next(err)
  }
}