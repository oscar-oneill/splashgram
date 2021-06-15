global.fetch = require("node-fetch")
const express = require("express")
const cors = require("cors")
const path = require('path');
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const Unsplash = require("unsplash-js").default
const { toJson } = require("unsplash-js")

const app = express()
const port = process.env.PORT || 9000;

global.fetch = fetch;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.post("/login", async (req, res) => {
    const code = req.body.code;

    if (code) {
        console.log("Code:", code);
    }

    const params = {
        client_id: process.env.unsplashKey,
        client_secret: process.env.unsplashSecret,
        redirect_uri: process.env.redirect_uri,
        code: code,
        grant_type: "authorization_code"
    }

    const response = await fetch("https://unsplash.com/oauth/token", {
        method: "POST",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    const data = await response.json();
    console.count("Data Count", data)
    console.log(data);

    if (!data.error) {
        res.status(200).send(data)
    } 
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Lift off 💨 💨 🔥 🔥 🚀 ... server is running on PORT: ${port}`)
}); 