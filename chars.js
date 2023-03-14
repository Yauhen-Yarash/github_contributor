const _ = require('lodash')

const chars = _.mapValues({
  A: `-++-
      +--+
      +--+
      ++++
      +--+`,

  B: `++++
      +--+
      +++-
      +--+
      ++++`,

  C: `-+++
      +---
      +---
      +---
      -+++`,

  D: `+++-
      +--+
      +--+
      +--+
      +++-`,

  E: `+++
      +--
      +++
      +--
      +++`,

  F: `+++
      +--
      +++
      +--
      +--`,

  G: `-+++-
      +----
      +-+++
      +---+
      -+++-`,

  H: `+--+
      +--+
      ++++
      +--+
      +--+`,

  I: `+++
      -+-
      -+-
      -+-
      +++`,

  J: `--+++
      ----+
      ----+
      +---+
      -+++-`,

  K: `+--+
      +-+-
      ++--
      +-+-
      +--+`,

  L: `+--
      +--
      +--
      +--
      +++`, 

  M: `+---+
      ++-++
      +-+-+
      +---+
      +---+`,

  N: `+---+
      ++--+
      +-+-+
      +--++
      +---+`,

  O: `-++-
      +--+
      +--+
      +--+
      -++-`
}, charPicture => {
  const rows = charPicture.replace(/[ ]/g, '').split(/\n/)
  const matrix = rows.map(row => (
    row.split('').map(pixel => pixel === '+')
  ))

  return matrix
})

const generateMatrix = (word) => {
  const wordChars = word.split('')
  const dif = (_.difference(wordChars, _.keys(chars)))
  if(dif.length) {
    throw new Error('Symbol not supported!', dif)
  }

  const space = [[false], [false], [false], [false], [false]]
  const lineHeight = 5

  const matrices = wordChars.map(char => chars[char])
  const matricesWithSpaces = matrices.reduce((acc, i) => [...acc, i, space], []).slice(0, -1)
  const resultMatrix = Array(lineHeight).fill().map((_, rowNumber) => (
    matricesWithSpaces.map(charMatrixRow => charMatrixRow[rowNumber]).flat()
  ))
  const emptyRow = Array(resultMatrix[0].length).fill(false)

  return [emptyRow, ...resultMatrix, emptyRow]
}

module.exports = {chars, generateMatrix}
