const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/hello', (req, res) => {
    res.status(200).json({ message: "Hello! How are you?" });
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})