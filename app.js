const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
var fs = require('fs');
var youtubedl = require('youtube-dl');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",function(req,res) {
    res.render("index");
})


app.get("/success", function(req,res) {
    
    res.render("success");
})

app.post("/success",function(req,res) {
    res.redirect("/");
})

app.post("/",function(req,res) {
    var video = youtubedl(req.body.url,
// Optional arguments passed to youtube-dl.
['--format=18'],
// Additional options can be given for calling `child_process.execFile()`.
{ cwd: __dirname });

// Will be called when the download starts.
video.on('info', function(info) {
console.log('Download started');
console.log('filename: ' + info._filename);
console.log('size: ' + info.size);
video.pipe(fs.createWriteStream("/Users/mfrahman/Downloads/" +info._filename+'.mp4'));
});

res.redirect("/success")



});


app.listen(3000,function(){
    console.log("Server is running")
});
