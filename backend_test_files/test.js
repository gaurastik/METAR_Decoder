const express = require('express')

const app = express()



app.get('/', (req, res) => {
    console.log("I'm here!@")
})


app.listen(3000, () => {
    console.log("Server is up and running!")
})