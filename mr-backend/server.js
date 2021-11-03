const express = require('express');
const fs = require('fs'); 
var cors = require('cors');
const path = require('path');

const app = express();
// 這裡先去裝 cors 模組 (npm install cors --save)，這樣前端才能fetch資料  use it before all route definitions)
app.use(cors({origin: '*'}));

const data = [];
const message = [];
const floder_result = path.join(__dirname,'result\\');
const floder_message = path.join(__dirname,'message\\');

//1. 將網址(url)及標題(title)等資料 存入data陣列
for(let i=1;i<=5;i++){
    let tempArray = JSON.parse(fs.readFileSync(floder_result+`result${i}.json`, 
                            {encoding:'utf8', flag:'r'}));
    try{
        tempArray[0].unshift(...JSON.parse(fs.readFileSync(floder_result+`result${i-1}_temp.json`, 
                                    {encoding:'utf8', flag:'r'})));
    }catch(err){}
    
    data.push(...tempArray);
}

//2. 將篇題(message)存入陣列
for(let i=1;i<=5;i++){
    let tempArray = JSON.parse(fs.readFileSync(floder_message+`message${i}.json`, 
                            {encoding:'utf8', flag:'r'}));
    
    message.push(...tempArray);
}


app.get('/apiData', function(req, res){
    res.json(data);
});

app.get('/apiMessage', function(req, res){
    res.json(message);
});

app.listen(3000);