global.fetch = require("node-fetch")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const path = require("path")
const Unsplash = require("unsplash-js").default
const { toJson } = require("unsplash-js")
const { response } = require("express")
const { json } = require("body-parser")
const fs = require("fs")
const https = require("https")

const app = express()
const port = process.env.PORT || 9000;

global.fetch = fetch;
const unsplash = new Unsplash({accessKey: process.env.unsplashKey})

const client_id = process.env.unsplashKey
const secret = process.env.unsplashSecret
const callback = process.env.callbackUrl

app.use(cors())
app.use(express.static(path.join(__dirname, "./public")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.get("/photos", (req, res) => {
  unsplash.photos.listPhotos(1, 30)
    .then(toJson)
    .then(json => {
      res.status(200).send(json)
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })
})

app.post("/search", (req, res) => {
  let { inputRequest } = req.body;
  inputRequest = inputRequest.toLowerCase();
  console.log(inputRequest)
  unsplash.search.photos(inputRequest, 1, 30, { orderBy: 'latest' })
    .then(toJson)
    .then(json => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })
})

app.get("/users/:username", (req, res) => {
  const username = req.params.username;

  unsplash.users.profile(username)
  .then(toJson)
  .then(json => {
      res.status(200).sendFile(__dirname + "/public/users.html");
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })
})

app.post("/profile", (req, res) => {
  let userString = req.body.queryString.pathname.toString();
  let user = userString.slice(7);

  unsplash.users.profile(user)
  .then(toJson)
  .then(json => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })
})

app.post("/profile/photos", (req, res) => {
  let userString = req.body.queryString.pathname.toString();
  let user = userString.slice(7);

  unsplash.users.photos(user, 1, 30, "latest")
  .then(toJson)
  .then(json => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })
})

app.post("/profile/likes", (req, res) => {
  let userString = req.body.queryString.pathname.toString();
  let user = userString.slice(7);

  unsplash.users.likes(user, 1, 30, "latest")
  .then(toJson)
  .then(json => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })
})

app.post("/profile/collections", (req, res) => {
  let userString = req.body.queryString.pathname.toString();
  let user = userString.slice(7);

  unsplash.users.collections(user, 1, 30, "latest")
  .then(toJson)
  .then(json => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log("An error has occurred:", err)
      res.status(500).send({ "message:": err })
    })

})


app.get("/photos/:id/download", (req, res) => {
  const photo_id = req.params.id

  fetchDownloadURL = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/${photo_id}/download`, {
      headers: {
        Authorization: `Client-ID ${client_id}`
      }
    })
    const data = await response.json()
    res.redirect(data.url)
  }

  fetchDownloadURL()

})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

