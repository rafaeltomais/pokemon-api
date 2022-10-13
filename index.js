const express = require('express');

const route = require('./router')
const app = express('');
const port = 8000;

app.use(express.json());
app.use(route)

app.listen(port, () => console.log('Server is online.'))