const express = require('express')
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/views/test2.html'));
})

app.listen(process.env.PORT || 3000, () => console.log("Server is Running"))