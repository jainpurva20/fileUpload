const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
const cors = require('cors');
var fileupload = require("express-fileupload");
var fs = require('fs');
app.use(fileupload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Use cors and fileUpload*/
app.use(cors());

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/public', express.static(__dirname + '/public'));

app.post('/upload', function (req, res) {
    var uploadedFile =req.files.file;
   //res.json({success: false, code: 2001})
    var _res = res;
    uploadedFile.mv(`${__dirname}/public/${uploadedFile.name}`, function(err) {
        if (err) {
            return res.json({success: false, code: 2001})
         
        } else {
            fs.readFile(`public/${uploadedFile.name}`,'utf-8', function(err, data){ 
                if(err){
                    return res.json({success: false, code: 2001})
                } else {
                    let splittedDataFormat = [];
                    let ResultArray = data.split("\n");
                    ResultArray.forEach((userDetails, index)=>{
                        splittedDataFormat.push(userDetails.split("|"))
                    })
                
                    res.json({success: true, code: 2000, uploadedData: JSON.stringify(splittedDataFormat)})
                }

            })
        }
    });
   
});

app.listen(process.env.PORT || 8000);