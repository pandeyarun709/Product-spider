const request      = require('request'),
      constants    = require('../constants/constants');

/**
 * Fetch Data from provided Search Url
 * @param {string} url 
 * @param {string} searchKey 
 */
function searchProduct(url, searchKey) {
    return new Promise((resolve, reject) => {
        request(url + searchKey , (error, response, body)=>{
            if(!error && response.statusCode == 200){
                resolve({
                    status : constants.STATUS_SUCCESS,
                    body : body
                });
            }else {
                resolve({
                    status : constants.STATUS_ERROR
                })
            }
        });
    }) 
 }

 module.exports = {
    searchProduct
 }