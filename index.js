const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
var os = require("os");

//To write the files in the DateTime folder
app.get('/write',(req,res)=>{
    res.writeHead(200,{"Content-Type":'text/html'})
    let date = new Date();
    let month = date.getMonth()+1;
    let dateFormat=date.getFullYear()+(month<10 ? '0'+month : month)+(date.getDate()<10 ? '0'+date.getDate() : date.getDate())+'-'
    +(date.getHours()<10 ? '0'+date.getHours() : date.getHours())+
    (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes())+
    (date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds());
        fs.writeFile(`DateTime/${dateFormat}.txt`,String(date.valueOf()),(err)=>{
            if(err)
            console.log(err);
        })
        res.write(`Created the file ${dateFormat}.txt`);
        res.end()
})

//To read the conetent of the files from DateTime folder
app.get('/read',(req,res)=>{
    res.writeHead(200,{"Content-Type":'text/html'})
    let result='';
    fs.readdir('DateTime',(err,files)=>{
        if(err){
            console.log(err);
        }
        else{
            files.forEach((file)=>{
            res.write(`Timestamp inside '${file}' file: `+fs.readFileSync(`DateTime/${file}`)+'\n');
        })
        res.end();
       }
    })
})

app.listen(PORT,()=>{
        console.log("server is running",PORT)
    })

