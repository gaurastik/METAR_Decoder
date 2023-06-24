// const { response } = require("express")

console.log("Client side js file loaded")

fetch('http://localhost:3000/:variableRootURL/:variableRootURL/:variableRootURL').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})