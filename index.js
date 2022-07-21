const express = require('express')
const app = express()

var cookiesparser =require("cookie-parser")
app.use(cookiesparser())

app.use(express.json())
app.use(express.urlencoded({extended:true}));

require('dotenv').config({ path: './config/config.env' })
// Setting UP Router file
var router = require('./routers/route');
app.use(router);

const port = process.env.PORT || 4000;

// Connecting to Database
const connectDatabase = require('./config/database');
connectDatabase();


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})