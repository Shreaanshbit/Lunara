const MS_PER_DAY = 1000 * 60 * 60 * 24
const MIN_VALID_CYCLE_LENGTH = 21
const MAX_VALID_CYCLE_LENGTH = 45
const DEFAULT_CYCLE_LENGTH = 28

const toUtcDateOnly = value => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
  )
}

const daysBetween = (a, b) => {
  const start = toUtcDateOnly(a)
  const end = toUtcDateOnly(b)

  if (!start || !end) return 0

  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY)
}

const isValidCycleLength = length =>
  Number.isFinite(length) && length >= MIN_VALID_CYCLE_LENGTH && length <= MAX_VALID_CYCLE_LENGTH

const normalizeCycleCandidates = cycles => {
  if (!Array.isArray(cycles) || !cycles.length) return []

  return cycles
    .map(cycle => {
      if (typeof cycle === 'number') return cycle
      if (!cycle || !cycle.periodStart) return null
      return cycle.cycleLength
    })
    .filter(value => isValidCycleLength(value))
}

exports.calculatePeriodLength = (periodStart, periodEnd) => {
  if (!periodStart || !periodEnd) return 0
  return daysBetween(periodStart, periodEnd)
}

exports.calculateCycleLength = (currentPeriodStart, previousPeriodStart) => {
  if (!currentPeriodStart || !previousPeriodStart) return DEFAULT_CYCLE_LENGTH
  return daysBetween(previousPeriodStart, currentPeriodStart)
}

exports.calculateCycleLengths = (cycles, currentPeriodStart) => {
  if (!Array.isArray(cycles) || !cycles.length) {
    return currentPeriodStart ? [DEFAULT_CYCLE_LENGTH] : []
  }

  const sorted = [...cycles]
    .filter(cycle => cycle && cycle.periodStart)
    .sort((a, b) => new Date(a.periodStart) - new Date(b.periodStart))

  const validLengths = []

  for (let i = 1; i < sorted.length; i += 1) {
    const difference = daysBetween(sorted[i - 1].periodStart, sorted[i].periodStart)
    if (isValidCycleLength(difference)) validLengths.push(difference)
  }

  if (currentPeriodStart) {
    const lastCycle = sorted[sorted.length - 1]
    if (lastCycle && lastCycle.periodStart) {
      const difference = daysBetween(lastCycle.periodStart, currentPeriodStart)
      if (isValidCycleLength(difference)) validLengths.push(difference)
    }
  }

  return validLengths.length ? validLengths : [DEFAULT_CYCLE_LENGTH]
}

exports.calculateAverageCycle = cycles => {
  const validValues = normalizeCycleCandidates(cycles)

  if (!validValues.length) {
    return DEFAULT_CYCLE_LENGTH
  }

  const average =
    validValues.reduce((total, value) => total + value, 0) / validValues.length

  return Math.round(average)
}

exports.calculateAverageCycleLength = (cycleLengths, fallback = DEFAULT_CYCLE_LENGTH) => {
  const validLengths = (Array.isArray(cycleLengths) ? cycleLengths : []).filter(isValidCycleLength)

  if (!validLengths.length) return fallback

  const average = validLengths.reduce((sum, value) => sum + value, 0) / validLengths.length
  return Math.round(average)
}

exports.predictNextPeriod = (lastPeriodStart, avgCycleLength = DEFAULT_CYCLE_LENGTH) => {
  const start = toUtcDateOnly(lastPeriodStart)
  if (!start) return null

  return new Date(start.getTime() + avgCycleLength * MS_PER_DAY)
}

exports.calculateOvulationDate = predictedNextPeriod => {
  if (!predictedNextPeriod) return null

  // Calendar-based estimate only: ovulation is roughly 14 days before the predicted next period.
  const nextPeriod = toUtcDateOnly(predictedNextPeriod)
  if (!nextPeriod) return null

  return new Date(nextPeriod.getTime() - 14 * MS_PER_DAY)
}

exports.getFertileWindow = ovulationDate => {
  if (!ovulationDate) {
    return { start: null, end: null }
  }

  const ovulation = toUtcDateOnly(ovulationDate)
  if (!ovulation) {
    return { start: null, end: null }
  }

  return {
    start: new Date(ovulation.getTime() - 5 * MS_PER_DAY),
    end: new Date(ovulation.getTime() + 1 * MS_PER_DAY)
  }
}

exports.getCyclePhase = (periodStart, secondArg, thirdArg, fourthArg) => {
  const referenceDate = fourthArg ? toUtcDateOnly(fourthArg) : new Date()
  const start = toUtcDateOnly(periodStart)

  if (!start || !referenceDate) return 'unknown'

  const dayInCycle = daysBetween(start, referenceDate)

  let predictedNextPeriod = null
  let ovulationDate = null

  if (secondArg instanceof Date || typeof secondArg === 'string') {
    predictedNextPeriod = toUtcDateOnly(secondArg)
    ovulationDate = thirdArg ? toUtcDateOnly(thirdArg) : null
  } else if (Number.isFinite(secondArg)) {
    predictedNextPeriod = exports.predictNextPeriod(start, secondArg)
    ovulationDate = exports.calculateOvulationDate(predictedNextPeriod)
  }

  if (!predictedNextPeriod) {
    predictedNextPeriod = exports.predictNextPeriod(start, DEFAULT_CYCLE_LENGTH)
  }

  if (!ovulationDate) {
    ovulationDate = exports.calculateOvulationDate(predictedNextPeriod)
  }

  if (dayInCycle < 0) return 'upcoming'
  if (dayInCycle <= 5) return 'menstrual'
  if (referenceDate < ovulationDate) return 'follicular'
  if (referenceDate <= new Date(ovulationDate.getTime() + 1 * MS_PER_DAY)) {
    return 'ovulation'
  }
  if (referenceDate < predictedNextPeriod) return 'luteal'

  return 'menstrual'
}

exports.getPredictionConfidence = cycles => {
  const validValues = normalizeCycleCandidates(cycles)

  if (validValues.length >= 6) return 'high'
  if (validValues.length >= 3) return 'medium'
  return 'low'
}