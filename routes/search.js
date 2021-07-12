global.fetch = require("node-fetch");
const router = require('express').Router();
const dotenv = require("dotenv").config();
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage('./scratch'); 
let token = localStorage.getItem('access_token');

// Randomize page and sorting
const nums = ["1", "2", "3", "4", "5", "6", "7"];
const randomizeNumbers = Math.floor(Math.random() * nums.length);
const page = nums[randomizeNumbers];

const sorting = ["latest", "oldest", "popular"];
const randomizeSorting = Math.floor(Math.random() * sorting.length);
const order = sorting[randomizeSorting];

console.log(page, order)

router.post("/results", async (req, res) => {
    const query = req.body.query;
    
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
        console.log("Photo search triggered with user credentials.");
        res.status(200).send(data);
    } else if ((token == null) && (query)) {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&order_by=${order}`, alt_headers);
        const data = await response.json();
        console.log("Photo search triggered as guest.");
        res.status(200).send(data);
    }
})

module.exports = router;