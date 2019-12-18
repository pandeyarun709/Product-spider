const request  =   require('request'),
      express  =   require('express'),
      app      =   express();

 const paytmManager    = require('./api/manager/paytmProductManager'),
       amazonManager   = require('./api/manager/amazonProductManager');
         
app.use(express.static("public"));     

app.get("/" , (req ,res) => {
   res.render("index.ejs" , {amazon : [] , paytm : []});
});

app.get("/products" , (req , res)=> {
    const search = req.query.product;
    Promise.all([paytmManager.fetchPaytmProducts(search), amazonManager.fetchAmazonProducts(search)])
    .then(data => {
       res.render("index.ejs", {amazon : data[1].amazon, paytm : data[0].paytm});
    }).catch(err => {
       console.log(err);
    });
});

app.listen(8002, ()=>{
     console.log("Server start");
});






