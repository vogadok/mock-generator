const express = require('express')
const app = express();
const path = require('path');
const home = require('./public/views/home.html')


app.use(express.static(path.join(__dirname, 'public')));

app.use("/public/views", home);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
})

app.listen(process.env.PORT || 3000, () => console.log("Server is Running"))