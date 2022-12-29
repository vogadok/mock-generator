const express = require('express')
const app = express();
const jsforce = require('jsforce');
const cors = require('cors');
const { json } = require('express');

var conn = new jsforce.Connection();
conn.login('ks.vogado@resilient-hawk-cinlpe.com', 'Amigosww123456!Yiydk2qguVxEamfxHI4tg6Yg')
app.use(cors())

app.use(express.static('public'));


app.get('/', (req, res) =>{
    //res.status(200).json({Name:'name test'})
    //res.sendFile(path.join(__dirname+'/public/views/home.html'));
})

app.get('/data', (req, res) => {
  selectFieldsFrom("name", "Account", req, res)
})

function selectFieldsFrom(fields, obj, req, res){

  conn.query("SELECT " +fields+ " FROM " + obj, function(err, result) {
    if (err) { return console.error(err); }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
    console.log("records: " + JSON.stringify(result.records))

    const dados = result.records;
    console.log(Array.isArray(dados))

    return res.status(200).json(dados.map(element => {
        console.log("name: " + element.Name)
        return element.Name
    }));
  }); 
}

function getDescribeSobjects(){
  conn.describeGlobal(function(err, res) {
    if (err) { return console.error(err); }
    console.log('Num of SObjects : ' + JSON.stringify(res.sobjects));

    const dados = res.sobjects;
    console.log(Array.isArray(dados))
    
    dados.map(element => {
      console.log("label: " + element.label)
      console.log("api-name: " + element.name)
    })

  });
}

function getDescribeFields(objectName){
  conn.describe(objectName, function(err, meta) {
    if (err) { return console.error(err); }
    console.log('Label : ' + meta.label);
    console.log('Num of Fields : ' + JSON.stringify(meta));
    // ...
  });
}

app.listen(process.env.PORT || 3000, () => console.log("Server is Running"))