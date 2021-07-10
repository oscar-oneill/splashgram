global.fetch = require("node-fetch");
const router = require('express').Router();
const dotenv = require("dotenv").config()
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage('./scratch'); 
let token = localStorage.getItem('access_token');

// Supplies photos to user
router.post("/feed", async (req, res) => {
    const query = req.body.query;
    const order = req.body.order;
    const page = req.body.page;

    const headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        }
    }

    const alt_headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Client-ID ${process.env.unsplashKey}`
        }
    }

    if ((token != null) && (query)) {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&order_by=${order}`, headers);
        const data = await response.json();
        console.log("Supplying photos as logged in user.");
        res.status(200).send(data);
    } else if ((token == null) && (query)) {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&order_by=${order}`, alt_headers);
        const data = await response.json();
        console.log("Supplying photos. Functionality limited.");
        res.status(200).send(data);
    }
});

// Fetches data of an individual photo
router.post("/photo", async (req, res) => {
    const id = req.body.id;
    const headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        }
    }

    const alt_headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Client-ID ${process.env.unsplashKey}`
        }
    }

    if (token != null) {
        const response = await fetch(`https://api.unsplash.com/photos/${id}`, headers)
        const data = await response.json()
        res.status(200).send(data)
    } else if (token == null) {
        const response = await fetch(`https://api.unsplash.com/photos/${id}`, alt_headers)
        const data = await response.json()
        res.status(200).send(data)
    }
})

module.exports = router;