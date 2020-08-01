const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const {toJson} = require('unsplash-js');
const { response } = require('express');
const { json } = require('body-parser');
global.fetch = fetch;
const unsplash = new Unsplash({accessKey:process.env.unsplashKey});

app.use(cors());
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/photos', (req, res) => {
    unsplash.photos.listPhotos(1,30)
    .then(toJson)
    .then(json => {
        res.status(200).send(json)
    })
    .catch((err) => {
        console.log('An error has occurred:', err);
        res.status(500).send({'message:': err})
    })
})

app.post('/api/search', (req, res) => {
    let { inputRequest } = req.body;
    inputRequest = inputRequest.toLowerCase();
    unsplash.search.photos(inputRequest,1,30)
    .then(toJson)
    .then(json => {
        res.status(200).send(json)
    })
    .catch((err) => {
        console.log('An error has occurred:', err);
        res.status(500).send({"message:": err})
        
    })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});



