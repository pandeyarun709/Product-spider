const request  =   require('request-promise'),
      cheerio  =   require('cheerio'),
      express  =   require('express'),
      app      =   express()

let userData = [];

const options = {
    url : `https://www.freecodecamp.org/forum/directory_items?period=weekly&order=likes_received&_=1552317943279`,
    json : true
}

request(options, (data) =>{
            
           // console.log("data ",data.directory_items[0].user);  
           //fetching user details 
            data.directory_items.forEach(user => {
               // console.log(user);
                userData.push({
                    username : user.user.username,
                    avatar : user.user.avatar_template ,
                    likes : user.likes_received
                })
            });

            //getChallengeCompleted();
        });
        

// function getChallengeCompleted()
// {
//     var i=0;
//     function next() {
//        if(i < userData.length) {
//             const options = {
//                 url : `https://www.freecodecamp.org/`+ userData[i].username,
//                 transform : body => cheerio.load(body)
//             }

//             request(options)
//                 .then( function ($) {
//                     const checkAccount = $('h1.landing-heading').length == 0;
//                     const challengePassed = checkAccount ? $('tbody tr').length : "unknown";
                    
//                     console.log(challengePassed);
//                     userData[i].challenges = challengePassed;
//                     ++i;
//                     return next();
//                 })
         
//        }
//     }

//     return next();
// }        

app.get("/" , (req , res)=> {
   res.render("index.ejs" , {users : userData});
});

app.listen(8079 , ()=>{
     console.log("Server start");
});