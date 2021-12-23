const express =require("express");
const https=require("https");

const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req,res) {
  res.sendFile(__dirname+"/index.html");
});
app.post ("/",function (req,res) {

   const query = req.body.cityname;
   const apikey ="d81edc534e3c1f04d0c2407a91bf0cdd";
   const unit ="metric";

   const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apikey +"&unit="+unit


   https.get(url ,function(response){
     console.log(response.statusCode);
     response.on("data",function (data) {
 const weatherdata= JSON.parse(data);
 const temp= weatherdata.main.temp
 const weatherdescription=weatherdata.weather[0].description;
 const icon=weatherdata.weather[0].icon;
 const imageURL = " http://openweathermap.org/img/wn/"+ icon + "@2x.png"
 res.write("<p>the weather is currently"+weatherdescription +"<P>" );
 res.write("<h1>the temperature in "+ query + temp + "degree celcius.</h1>");
 res.write("<img src= "+ imageURL + ">")
 res.send()
     })
   })
 })



app.listen(3000,function(){
  console.log("server is running on port 3000");

})
