global.fetch = require("node-fetch");
const router = require('express').Router();
const dotenv = require("dotenv").config();
global.fetch = fetch;

// Hits a photo's download endpoint
router.post("/download", async (req, res) => {
    const id = req.body.id;
    const location = req.body.downloadLocation;

    const headers = {
        headers: {
            Authorization: `Client-ID ${process.env.unsplashKey}`,
        }
    }

    try {
        const request = await fetch(location, headers);
        const data = await request.json();
        console.log(data)
        res.status(200).send("Download Triggered");

    } catch (error) {
        console.error(error);
        res.status(401).send("Bad Request");
    }
})

// Get a photo's EXIF DATA
router.post("/exif_data", async (req, res) => {
    const id = req.body.id;

    const headers = {
        headers: {
            Authorization: `Client-ID ${process.env.unsplashKey}`,
        }
    }

    const request = await fetch(`https://api.unsplash.com/photos/${id}`, headers);
    const data = await request.json();
    res.status(200).send(data);

})

module.exports = router;