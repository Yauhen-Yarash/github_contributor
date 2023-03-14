const generateMatrix = require('./chars').generateMatrix
const express = require('express')

const app = express()

const styles = `
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .title {
    text-align: center;
  }

  .screen {
    background-color: light-gray
  }

  .row {
    width: fit-content;
    margin: 0 auto;
  }

  .pixel {
    display: inline-block;
    border-radius: 2px;
    background-color: #ebedf0;
    border: 1px solid rgba(27, 31, 35, 0.06);

    box-sizing: border-box;
    height: 11px;
    width: 11px;
    margin: 2px;
  }

  .active {
    background-color: #216e39
  }
`
const word = process.argv[2] || 'ABCDEFGHIJKLMNO'

const renderPixel = () => '<div class="pixel"></div>'
const renderActivePixel = () => '<div class="pixel active"></div>'

const renderScreen = (word) => {
  const matrix = generateMatrix(word)
  const result = matrix.map(row => (
    `<div class='row'>
      ${row.map(pixel => pixel ? renderActivePixel() : renderPixel()).join('')}
    </div>`
  )).join('')

  return result
}

app.get('/', function (req, res) {
  res.write(`<html><head><style>${styles}</style></head><body>`)
  res.write(`
  <div class='app'>
    <div class='container'>
      <h1 class='title'>
        This picture would take ${generateMatrix(word)[0].length} weeks
      </h1>
      <div class='screen'>
        ${renderScreen(word)}
      </div>
    </div>
  </div>`)
  res.end('</body></html>')
})

app.listen(3000, () => {
  console.log(`Example of pic for word ${word}`)
})
