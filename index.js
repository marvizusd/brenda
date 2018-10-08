const express = require('express')
const app = express()
var path = require("path")
const port = 3000

app.use(express.static('images'))
app.use(express.static('css'))
app.use(express.static('fonts'))
app.use(express.static('js'))

app.use('/', express.static('images'));
app.use(express.static(__dirname + '/css'));

// app.get('/', (req, res) => res.sendFile('index.html'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))