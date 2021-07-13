global.fetch = require("node-fetch");
const router = require('express').Router();
global.fetch = fetch;
const { LocalStorage } = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 

router.post("/login", async (req, res) => {
    const code = req.body.code;

    if (code) {
        console.log("Code supplied");
        console.log("Awaiting access token...")
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
    console.log(data);

    localStorage.setItem('access_token', data.access_token);

    if (!data.error) {
        res.status(200).send(data);
    }
    process.exit(0);
});

router.post("/logout", (req, res) => {
    console.log("User has logged out...")
    localStorage.removeItem('access_token')
    process.exit(0);
});

module.exports = router;