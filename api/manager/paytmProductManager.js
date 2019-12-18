const cheerio = require('cheerio');

const search     = require('./../services/productSearch'),
      constants  = require('./../constants/constants');

async function fetchPaytmProducts(searchKey) {
    let paytm = [];
    return new Promise((resolve, reject) => {
        search.searchProduct(constants.URL_PAYTM, searchKey)
        .then(async data => {
            if(data.status == constants.STATUS_SUCCESS) {
               const $ = cheerio.load(data.body);
               paytm = await fetchProductFromPaytm($, paytm);
            } 

            resolve({paytm});      
        }).catch(err => {
            console.log(err);
            resolve({paytm});
        });
    })
}

// Scraping Products from Paytm
async function fetchProductFromPaytm($, paytm) {
    $('._1fje').each((i, e) => {
        const a = $(e).find('a').attr('href');
        const img = $(e).find('img').attr('src');
       
        paytm.push({
          img : img,
          link : 'https://paytmmall.com'+a
       });
    });  
     
    return paytm;
}

module.exports = {
    fetchPaytmProducts
}