const request  =   require('request'),
      cheerio  =   require('cheerio'),
      express  =   require('express'),
      app      =   express()
      

 let $;     
app.use(express.static("public"));     

var urlPaytm  = `https://paytmmall.com/shop/search?q=`;
var urlAmazon =  `https://www.amazon.in/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=`;


let products = [];
//dummy data
/*let prod = {
   // productName : 'Nike',
    img : `https://assetscdn1.paytm.com/images/catalog/product/S/SP/SPONIKE-STRIKE-KESH8299226A8E57D8/0..jpg?imwidth=282&impolicy=hq`,
    link : `https://paytmmall.com/nike-strike-football-size-5-SPONIKE-STRIKE-KESH8299226A8E57D8-pdp?product_id=220528122&src=search-grid&tracker=organic%7C21426%7Cnike%20soccer%7Cgrid%7CSearch_experimentName%3Dnew_ranking%7C%7C1%7Cnew_ranking&site_id=2&child_site_id=6`
};
*/

app.get("/" , (req ,res) => {
   res.render("index.ejs" , {products : products});
});
app.get("/products" , (req , res)=> {
  console.log(req.query.product);
  products = [];
   request(urlAmazon +req.query.product , (error, response, body)=>{
      if(!error && response.statusCode == 200){
          
          $ = cheerio.load(body);
          fetchProductFromAmazon();
          //fetchProductFromPaytmMall();
        //setTimeout(fetchProductFromAmazon , 7000);
         res.redirect("/");
      }else {
         console.log(error);
      }
  });

});

app.listen(8002, ()=>{
     console.log("Server start");
});

function fetchProductFromAmazon() {
   let allItems = $('ul');
   //var a = $('ul').children().eq(0).find('a').attr('href');
   //var im = $('ul').children().eq(0).find('img').attr('src');

   // console.log(a);
   // console.log(im);

  allItems.each( function(index) {
     var a = $('ul').children().eq(index).find('a').attr('href');
     var im = $('ul').children().eq(index).find('img').attr('src');
   //  var productName = $('ul').children().eq(index).find('span .a-color-base').text();
  //   var price = $('ul').children().eq(index).find('span .currencyINR').text();
      products.push({
         img : im,
         link : a
      });
     
   });
  

}