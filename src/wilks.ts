import { Gender, Wilks } from './types'
import kg2lbs from './libs/kg2lbs'
import format from './libs/format'

/**
 * Coefficients for Wilks v.1 before 2020
 */
const paramsV1 = {
  m: [
    -216.0475144,
    16.2606339,
    -0.002388645,
    -0.00113732,
    7.01863e-6,
    -1.291e-8,
  ],
  f: [
    594.31747775582,
    -27.23842536447,
    0.82112226871,
    -0.00930733913,
    4.731582e-5,
    -9.054e-8,
  ],
}

/**
 * Coefficients for Wilks v.2 2020
 */
const paramsV2 = {
  m: [
    47.4617885411949,
    8.47206137941125,
    0.073694103462609,
    -0.00139583381094385,
    7.07665973070743e-6,
    -1.20804336482315e-8,
  ],
  f: [
    -125.425539779509,
    13.7121941940668,
    -0.0330725063103405,
    -0.0010504000506583,
    9.38773881462799e-6,
    -2.3334613884954e-8,
  ],
}

const coefficient = (weight: number, gender: Gender, version = 2) => {
  const c = version === 2 ? paramsV2[gender] : paramsV1[gender]
  const numerator = version === 2 ? 600 : 500
  const w = weight

  return (
    numerator /
    (c[0] +
      c[1] * w +
      c[2] * w ** 2 +
      c[3] * w ** 3 +
      c[4] * w ** 4 +
      c[5] * w ** 5)
  )
}

/**
 * Wilks v.2 - 2020
 */
export const wilks2: Wilks = (
  bodyWeight,
  liftedWeight,
  gender,
  unitType = 'kg',
  version = 2
) => {
  if (unitType === 'lb') {
    bodyWeight = kg2lbs(bodyWeight)
    liftedWeight = kg2lbs(liftedWeight)
  }

  return format(liftedWeight * coefficient(bodyWeight, gender, version))
}

/**
 * Wilks v.1 - before 2020
 */
export const wilks: Wilks = (
  bodyWeight,
  liftedWeight,
  gender,
  unitType = 'kg'
) => wilks2(bodyWeight, liftedWeight, gender, unitType, 1)
