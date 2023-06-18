const express = require('express')
const path = require('path')
const app = express()

const frontend_dir_path = path.join(__dirname, '../frontend+QGIS')

app.use(express.static(frontend_dir_path))


app.listen(3000, () => {
    console.log("Server is up and running!")
})