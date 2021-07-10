global.fetch = require("node-fetch");
const router = require('express').Router();
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage('./scratch'); 
let token = localStorage.getItem('access_token');

if (token == null) {
    console.log("No token present.")
} else {
    console.log("Token:", token)
}

// These routes assume that a user is logged in

// Liking a photo
router.post("/like_photo", async (req, res) => {
    const id = req.body.id;
    const headers = {
        method: "POST",
        headers: {
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        } 
    }

    if (token != null) {
        const response = await fetch(`https://api.unsplash.com/photos/${id}/like`, headers);
        const data = await response.json();
        res.status(200).send(data);
    } else {
        console.log("User not logged in.");
        res.status(401).send("User must be logged in to do this.");
    }
    
});

// Unliking a photo
router.post("/remove_like", async (req, res) => {
    const id = req.body.id;
    const headers = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    }

    if (token != null) {
        const response = await fetch(`https://api.unsplash.com/photos/${id}/like`, headers);
        const data = await response.json();
        res.status(200).send(data);
    } else {
        console.log("User not logged in.");
        res.status(401).send("User must log in with Unsplash to perform this action.");
    }
    
});

// Add a photo to a collection
router.post("/add_photo", async (req, res) => {
    const photoID = req.body.photoID;
    const collectionID = req.body.collectionID;

    const headers = {
        method: "POST",
        headers: {
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
        } 
    }

    if (token != null) {
        const response = await fetch(`https://api.unsplash.com/collections/${collectionID}/add?photo_id=${photoID}`, headers);
        const data = await response.json();
        res.status(200).send(data);
    } else {
        console.log("User not logged in.");
        res.status(401).send("User must be logged in to do this.");
    }
    
});

// Removing a photo from a collection
router.post("/remove_photo", async (req, res) => {
    const photoID = req.body.photoID;
    const collectionID = req.body.collectionID;

    const headers = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    }

    if (token != null) {
        const response = await fetch(`https://api.unsplash.com/collections/${collectionID}/add?photo_id=${photoID}`, headers);
        const data = await response.json();
        res.status(200).send(data);
    }
    
});

module.exports = router;