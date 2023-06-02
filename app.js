const express = require('express');
const bodyParser =require('body-parser');
const https = require('https');

const app =express();
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post('/',function(req,res){
    const query = req.body.cityName;
    console.log(query);
    const apikey = "803b2c4ddd86dfbd75191a4e82fc7ba5";
    const unit ="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?appid=" +apikey+"&q=" +query+"&unit="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const des=weatherdata.weather[0].description;
            
            const id=weatherdata.weather[0].id;
            const icon=weatherdata.weather[0].icon;
            const imgurl ="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
        
           res.write("<h1>The temperature in the "+query+" is "+temp + " degree celsius</h1>")
           res.write("<p>The weather description is " +des+ " </p>")
           res.write("<img src=" +imgurl+">");

        

           res.send();
           
        });
    });
})




app.listen(3000,function(){
    console.log("server is running on port 3000");
});


