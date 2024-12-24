const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/weather', async (req, res) => {
  const zipCode = req.body.zipCode
  const apiKey = 'affa1684e496154c9ce322ab7ef5c431'
  try {
    const response = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&AppId=${apiKey}`
    const weatherData = response.data
    res.render('weather/show', {
      city: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description
    })
  } catch (error) {
    console.error(error)
    res.send('Error fecthing weather data')
  }
})
app.get('/weather/show', (req, res) => {
  const { city, temp, description } = req.query
  res.render('weather/show', { city, temp, description })

  app.listen(port, () => {
    console.log(`Listening server port ${port}`)
  })
})
