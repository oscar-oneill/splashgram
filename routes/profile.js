global.fetch = require("node-fetch");
const router = require('express').Router();
const dotenv = require("dotenv").config()
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage('./scratch'); 
let token = localStorage.getItem('access_token');

// Retrieve User's Profile Data
router.post("/data", async (req, res) => {
    const username = req.body.username;
    
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
        const response = await fetch(`https://api.unsplash.com/users/${username}`, headers);
        const data = await response.json();
        res.status(200).send(data); 
    } else {
        const response = await fetch(`https://api.unsplash.com/users/${username}`, alt_headers);
        const data = await response.json();
        res.status(200).send(data); 
    }
})

// Retrieve User's Uploaded Photos
router.post("/photos", async (req, res) => {
    const username = req.body.username;
    
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
        const response = await fetch(`https://api.unsplash.com/users/${username}/photos?per_page=30`, headers);
        const data = await response.json();
        res.status(200).send(data);
    } else {
        const response = await fetch(`https://api.unsplash.com/users/${username}/photos?per_page=30`, alt_headers);
        const data = await response.json();
        res.status(200).send(data);
    }
})

// Retrieve User's Liked Photos
router.post("/likes", async (req, res) => {
    const username = req.body.username;
    
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
        const response = await fetch(`https://api.unsplash.com/users/${username}/likes?per_page=30`, headers);
        const data = await response.json();
        res.status(200).send(data); 
    } else {
        const response = await fetch(`https://api.unsplash.com/users/${username}/likes?per_page=30`, alt_headers);
        const data = await response.json();
        res.status(200).send(data); 
    }
})

// Retrieve User's Photo Collections
router.post("/collections", async (req, res) => {
    const username = req.body.username;
    
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
        const response = await fetch(`https://api.unsplash.com/users/${username}/collections`, headers);
        const data = await response.json();
        res.status(200).send(data);
    } else {
        const response = await fetch(`https://api.unsplash.com/users/${username}/collections`, alt_headers);
        const data = await response.json();
        res.status(200).send(data);
    }
})

module.exports = router;