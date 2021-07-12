global.fetch = require("node-fetch");
const router = require('express').Router();
const dotenv = require("dotenv").config()
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage('./scratch'); 
let token = localStorage.getItem('access_token');

// Randomize photo feed on initial page load
const terms = ["new york", "los angeles", "seattle", "miami", "hollywood", "brooklyn", "beach", "waves", "palm trees", "miami beach", "madrid", "forest", "desert", "random", "neon", "wallpaper", "nyc", "mediterranean", "spring", "summer", "sunrise", "sunset", "morning", "afternoon", "sao paolo", "barcelona", "istanbul", "monaco", "wonder", "bliss", "serenity"];
const randomizeTerms = Math.floor(Math.random() * terms.length);
const query = terms[randomizeTerms];

const nums = ["1", "2", "3", "4", "5", "6", "7"];
const randomizeNumbers = Math.floor(Math.random() * nums.length);
const page = nums[randomizeNumbers];

const sorting = ["latest", "oldest", "popular"];
const randomizeSorting = Math.floor(Math.random() * sorting.length);
const order = sorting[randomizeSorting];

// Supplies photos to user 
router.post("/feed", async (req, res) => {
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
        console.log("Supplying photos with user credentials.");
        res.status(200).send(data);
    } else if ((token == null) && (query)) {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&order_by=${order}`, alt_headers);
        const data = await response.json();
        console.log("Supplying photos as guest.");
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