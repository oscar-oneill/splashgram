global.fetch = require("node-fetch")
const express = require("express")
const cors = require("cors")
const path = require('path');
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")

const app = express();
const port = process.env.PORT || 9000;

global.fetch = fetch;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use("/auth", require("./routes/login"))
app.use("/user", require("./routes/user"))
app.use("/profile", require("./routes/profile"))
app.use("/data", require("./routes/data"))
app.use("/media", require("./routes/media"))
app.use("/main", require("./routes/main"))

app.get("/authorize", (req, res) => {
    const authEndpoint = "https://unsplash.com/oauth/authorize";
    const client_id = process.env.unsplashKey;
    const redirect_uri = process.env.redirect_uri;
    const scopes = [
        "public",
        "read_user",
        "write_user",
        "read_photos",
        "write_photos",
        "write_likes",
        "write_followers",
        "read_collections",
        "write_collections",
    ];

    const accessUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("+")}&response_type=code`
    res.redirect(accessUrl)
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`)
}); 