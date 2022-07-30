const express = require('express')
const app = express()

var cookiesparser =require("cookie-parser")
app.use(cookiesparser())

var cors = require('cors') 
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}));

require('dotenv').config({ path: './config/config.env' })
// Setting UP Router file
var router = require('./routers/route');
app.use(router);

const port = process.env.PORT || 4000;
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


// Connecting to Database
const connectDatabase = require('./config/database');
connectDatabase();


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})