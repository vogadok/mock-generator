const express = require('express')
const app = express();
const path = require('path');
const jsforce = require('jsforce');
const cors = require('cors')

var conn = new jsforce.Connection();
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
})

app.get('/data', (req, res) => {
  conn.login('ks.vogado@resilient-hawk-cinlpe.com', 'Amigosww123456!v2tMqGc7r7zqDOa9XdAfXlwS7', 

  function(err, res) {
    if (err) { return console.error(err); }

    conn.query('SELECT Name FROM Account', function(err, res) {
      if (err) { return console.error(err); }
      console.log(res);
    });
  });
})

app.listen(process.env.PORT || 3000, () => console.log("Server is Running"))