const cheerio = require('cheerio');

const search     = require('./../services/productSearch'),
      constants  = require('./../constants/constants');

function fetchAmazonProducts(searchKey) {
    let amazon = [];
    return new Promise((resolve, reject) => {
        search.searchProduct(constants.URL_AMAZON, searchKey)
        .then(async data => {
            if(data.status == constants.STATUS_SUCCESS) {
               const $ = cheerio.load(data.body);
               amazon = await fetchProductFromAmazon($, amazon);
            }
             resolve({amazon});
        }).catch(err => {
            console.log(err);
            resolve({amazon});
        });
    });
}

// Scraping product from Amazon
async function fetchProductFromAmazon($ , amazon) {
    const allItems = $('ul');
    allItems.each( function(index) {
      var a = $('ul').children().eq(index).find('a').attr('href');
      var im = $('ul').children().eq(index).find('img').attr('src');
       amazon.push({
          img : im,
          link :  a
       });
    });
    return amazon;
 }

 module.exports = {
    fetchAmazonProducts
 }