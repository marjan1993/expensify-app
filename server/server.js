const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get("*", (req, res) => {// "*" means match all onMatch Routes, so if it is in public folder serve the up, if it is not we are going to serve the same thing every time
   res.sendFile(path.join(publicPath, "index.html"));//join publicPath with index.html
});

app.listen(port, ()=> {
    console.log("Server is up!");
});
