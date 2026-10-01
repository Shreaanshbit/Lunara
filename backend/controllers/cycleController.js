const Cycle = require('../models/Cycle')
const {
  calculatePeriodLength,
  calculateCycleLength,
  calculateAverageCycleLength,
  calculateCycleLengths,
  predictNextPeriod,
  calculateOvulationDate,
  getFertileWindow,
  getCyclePhase,
  getPredictionConfidence
} = require('../utils/cyclePrediction')

exports.addCycle = async (req, res, next) => {
  try {
    const { periodStart, periodEnd } = req.body

    const start = new Date(periodStart)
    const end = new Date(periodEnd)

    const periodLength = calculatePeriodLength(start, end)

    const previousCycles = await Cycle.find({ user: req.user._id }).sort({
      periodStart: 1
    })

    const mostRecentPreviousStart = previousCycles.length
      ? previousCycles[previousCycles.length - 1].periodStart
      : null

    const currentCycleLengthFromPrevious = mostRecentPreviousStart
      ? calculateCycleLength(start, mostRecentPreviousStart)
      : null

    const validHistoricalLengths = calculateCycleLengths(previousCycles, start)
    const avgCycleLength = calculateAverageCycleLength(validHistoricalLengths, 28)

    const cycleLength =
      currentCycleLengthFromPrevious &&
      currentCycleLengthFromPrevious >= 21 &&
      currentCycleLengthFromPrevious <= 45
        ? currentCycleLengthFromPrevious
        : avgCycleLength

    const predictedNextPeriod = predictNextPeriod(start, avgCycleLength)
    const ovulationDate = calculateOvulationDate(predictedNextPeriod)
    const fertileWindow = getFertileWindow(ovulationDate)
    const phase = getCyclePhase(start, predictedNextPeriod, ovulationDate, new Date())

    const cycle = await Cycle.create({
      user: req.user._id,
      periodStart: start,
      periodEnd: end,
      periodLength,
      cycleLength,
      predictedNextPeriod,
      phase,
      ovulationDate,
      fertileWindow
    })

    res.status(201).json({
      success: true,
      cycle,
      avgCycleLength
    })
  } catch (err) {
    next(err)
  }
}

exports.getCycles = async (req, res, next) => {
  try {
    const cycles = await Cycle.find({ user: req.user._id }).sort({
      periodStart: -1
    })
    res.json({ success: true, cycles })
  } catch (err) {
    next(err)
  }
}

exports.getCurrentCycleInsight = async (req, res, next) => {
  try {
    const cycles = await Cycle.find({ user: req.user._id }).sort({
      periodStart: -1
    })

    if (!cycles.length) {
      return res.json({ success: true, insight: null })
    }

    const latest = cycles[0]
    const avgCycleLength = calculateAverageCycleLength(
      calculateCycleLengths(cycles),
      28
    )
    const predictedNextPeriod =
      latest.predictedNextPeriod || predictNextPeriod(latest.periodStart, avgCycleLength)
    const ovulationDate =
      latest.ovulationDate || calculateOvulationDate(predictedNextPeriod)
    const fertileWindow =
      latest.fertileWindow || getFertileWindow(ovulationDate)
    const phase = getCyclePhase(
      latest.periodStart,
      predictedNextPeriod,
      ovulationDate,
      new Date()
    )
    const confidence = getPredictionConfidence(cycles)

    res.json({
      success: true,
      currentPhase: phase,
      predictedNextPeriod,
      fertileWindow,
      confidence
    })
  } catch (err) {
    next(err)
  }
}

exports.getCurrentCyclePhase = async (req, res, next) => {
  try {
    const cycles = await Cycle.find({ user: req.user._id }).sort({
      periodStart: -1
    })

    if (!cycles.length) {
      return res.json({ success: true, phase: null })
    }

    const latest = cycles[0]
    const avgCycleLength = calculateAverageCycleLength(
      calculateCycleLengths(cycles),
      28
    )
    const predictedNextPeriod =
      latest.predictedNextPeriod || predictNextPeriod(latest.periodStart, avgCycleLength)
    const ovulationDate =
      latest.ovulationDate || calculateOvulationDate(predictedNextPeriod)

    res.json({
      success: true,
      phase: getCyclePhase(latest.periodStart, predictedNextPeriod, ovulationDate, new Date())
    })
  } catch (err) {
    next(err)
  }
}