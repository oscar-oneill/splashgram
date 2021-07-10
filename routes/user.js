global.fetch = require("node-fetch");
const router = require('express').Router();
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage('./scratch'); 
let token = localStorage.getItem('access_token');

// Retrieve Logged In User's Profile Data
router.post("/me", async (req, res) => {
    const headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch("https://api.unsplash.com/me", headers);
    const data = await response.json();

    res.status(200).send(data);
});

// Retrieve Logged In User's Uploaded Photos
router.post("/photos", async (req, res) => {
    const username = req.body.loggedUsername;
    
    const headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch(`https://api.unsplash.com/users/${username}/photos?per_page=30`, headers);
    const data = await response.json();

    res.status(200).send(data);
})

// Retrieve Logged In User's Liked Photos
router.post("/likes", async (req, res) => {
    const username = req.body.loggedUsername;
    
    const headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch(`https://api.unsplash.com/users/${username}/likes?per_page=30`, headers);
    const data = await response.json();

    res.status(200).send(data); 
})
 
// Retrieve Logged In User's Photo Collections
router.post("/collections", async (req, res) => {
    const username = req.body.loggedUsername
    
    const headers = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch(`https://api.unsplash.com/users/${username}/collections`, headers);
    const data = await response.json();

    res.status(200).send(data);
})

module.exports = router;