const http = require('http');
const fs = require('fs');
const _ = require('lodash');
//http.createServer(); // which actually creates a server

//as an argument it takes callback func
//request and response object
//get, post request and also it gives where that request belong to
const server = http.createServer((req, res)=>{
   //console.log('request made!');
   console.log(req.url, req.method);
   
   //lodash
   const num = _.random(0, 30);
   console.log(num);



   //set header content type
   res.setHeader('Content-Type', 'text/html');
//    res.write('<head><link rel="stylesheet" href="#"></link></head>');
//    res.write('<p>hello Vaidehi</p>');
//    res.write('<p>hello Varada</p>');
//    res.end();

   let path = './views/';
   switch(req.url){
       case '/':
           path += 'index.html';
           res.statusCode = 200;
           break;
       case '/about':
           path +='about.html';
           res.statusCode = 200;
           break;
       case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', './about');
            res.end();
            break;    
       default:
           path += '404.html';
           res.statusCode = 404;
           break;        
   }

//send an html file
   fs.readFile(path, (err,data)=>{
      if(err){
          console.log(err);
          res.end();
      }
      else{
          res.write(data);
          res.end();
      }
   })


});

server.listen(3000, 'localhost',()=>{
    console.log('listening for requests on port 3000');
});