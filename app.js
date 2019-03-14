const request  =   require('request'),
      cheerio  =   require('cheerio'),
      express  =   require('express'),
      app      =   express()
      

 let $;     
app.use(express.static("public"));     

var urlPaytm  = `https://paytmmall.com/shop/search?q=`;
var urlAmazon =  `https://www.amazon.in/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=`;



let amazon = [];
let paytm = [];
//dummy data
/*let prod = {
   // productName : 'Nike',
    img : `https://assetscdn1.paytm.com/images/catalog/product/S/SP/SPONIKE-STRIKE-KESH8299226A8E57D8/0..jpg?imwidth=282&impolicy=hq`,
    link : `https://paytmmall.com/nike-strike-football-size-5-SPONIKE-STRIKE-KESH8299226A8E57D8-pdp?product_id=220528122&src=search-grid&tracker=organic%7C21426%7Cnike%20soccer%7Cgrid%7CSearch_experimentName%3Dnew_ranking%7C%7C1%7Cnew_ranking&site_id=2&child_site_id=6`
};
*/
/*==============================================================*/
/*################################## testing #############################*/




/*------------------------------------------------------------*/
app.get("/" , (req ,res) => {
   res.render("index.ejs" , {amazon : amazon , paytm : paytm});
});

app.get("/products" , (req , res)=> {
   var search = req.query.product;
   amazon = [];
   paytm = [];
 
   requestAmazon(search ,res);
   //requestPaytm(search);
   
   console.log(search);
  

});




app.listen(8002, ()=>{
     console.log("Server start");
});


// Request to Amazon
function requestAmazon(search ,res) {

   request(urlAmazon + search , (error, response, body)=>{
      if(!error && response.statusCode == 200){
          
          $ = cheerio.load(body);
          fetchProductFromAmazon();
          requestPaytm(search ,res); // request to paytum
      }else {
         console.log(error);
      }
  });


}

// Request to Paytm
function requestPaytm(search ,res) {

   request(urlPaytm + search , (error, response, body)=>{
      if(!error && response.statusCode == 200){
          
          $ = cheerio.load(body);
          fetchProductFromPaytm();
        //setTimeout(fetchProductFromAmazon , 7000);
        res.redirect('/'); // Render page 
      }else {
         console.log(error);
      }
   });
}



// Scraping product from Amazon
function fetchProductFromAmazon() {
  
   let allItems = $('ul');
  
   allItems.each( function(index) {
     var a = $('ul').children().eq(index).find('a').attr('href');
     var im = $('ul').children().eq(index).find('img').attr('src');
      amazon.push({
         img : im,
         link :  a
      });
     
   });
  

}

// Scraping Products from Flipkart
function fetchProductFromPaytm() {

$('._1fje').each((i, e) => {
    var a = $(e).find('a').attr('href');
    var img = $(e).find('img').attr('src');
   
    paytm.push({
      img : img,
      link : 'https://paytmmall.com'+a
   });
});
 
}