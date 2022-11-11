const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){



res.sendFile(__dirname+"/index.html");


});

app.post("/",function(req,res){

  var city = req.body.city;


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=53acffea1c0f95e8af6f08a48c120ad3&units=metric";
  https.get(url,function(response){
    // console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.write("<h1>The temperature in "+ city +" is : " + temp + " Degree Celcius. </h1>");
      res.write("<h2> The weather is currently : " + description + ".</h2>");
      res.write("<img src="+"https://openweathermap.org/img/wn/"+icon+"@2x.png" + ">");
      res.send();

    });

  });

});





app.listen(3000,function(){
  console.log("Server started......")
})
