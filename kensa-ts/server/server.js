const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

// the get '/*' request is required to get React router to work in production
app.get('/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3000, () => {
    console.log('Listening to port 3000');
})