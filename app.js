const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');
const { render } = require('express/lib/response');
//we need to setup express app
const app = express();

//connect to mongodb
const dbURL = 'mongodb+srv://net_vaidehi:Cpu%401234@nodetuts.m6nky.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURL)
   .then((result)=> app.listen(3000))
   .catch((err)=>console.log(err))

//register view engine
app.set('view engine', 'ejs');
//app.set('view', 'myviews');




//listen for requests
//app.listen(3000); //bydefault localhost

//now how we actually respond to those requests

// '/'=> root of the domain
// req, res object
//this is the code how we can respond to specific URL


//this is gonna fire for every single request

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.get('/add-blog', (req,res)=>{
  const blog = new Blog({   //new instance created
    title:'my new blog 1',
    snippet: 'about my new Blog',
    body: 'more about my new Blog',
  });
  
  blog.save()  //this is a asynchrounous task
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });


});

app.get('/all-blogs', (req,res)=>{
   Blog.find()  //as this method is also asynchronous therefore we use (then) method
   .then((result)=>{
     res.send(result); //sending response to the browser
   })
   .catch((err)=>{
     console.log(err);
   });
})


app.get('/single-blogs', (req,res)=>{
  Blog.findById('6295a246d6ef4045e5b03c1f')  //as this method is also asynchronous therefore we use (then) method
  .then((result)=>{
    res.send(result); //sending response to the browser
  })
  .catch((err)=>{
    console.log(err);
  });
})



app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// the below are get handlerss
app.get('/', (req, res)=>{
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', {root: __dirname});

    // const blogs =[
    //   {title:'Movie Date', snippet:'I remember when we went for movie first time...Honestly,I was little bit nervous about how things gonna happen but the way u comfort me...was precious for me!'},
    //   {title: 'Competitive Coding', snippet:'Competitive programming is a mind sport usually held over the Internet or a local network, involving participants trying to program according to provided specifications.'},
    //   {title:'How to defeat Brower', snippet: 'Lorem epson delor'},
    // ];
    // res.render('index', {title:'Home', blogs:blogs});
    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});

//redirects
// app.get('/about-me', (req,res)=>{
//     res.redirect('/about');
// });

//blog routes
// app.get('/blogs',(req,res)=>{
//   Blog.find().sort({createdAt: -1})
//     .then((result) =>{
//       res.render('index', {title: 'All Blogs', blogs:result})
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
// });


// app.post('/blogs', (req,res)=>{
//   const blog = new Blog(req.body);
//   blog.save()
//     .then((result)=>{
//         res.redirect('/blogs');
//     })
//     .catch((err)=>{
//       console.log(err);
//     })

// })

// app.get('/blogs/:id' , (req,res)=>{
//   const id = req.params.id;
//   //console.log(id);
//   Blog.findById(id)
//     .then(result =>{
//       res.render('details', {blog: result, title: 'Blog Details'});
//     })
//     .catch(err =>{
//        console.log(err);
//     })
// })


// app.delete('/blogs/:id', (req,res)=>{
//   const id = req.params.id;
//   Blog.findByIdAndDelete(id)
//     .then(result =>{
//       res.json({redirect:'/blogs'}) //response is send in the form of json
//     })
//     .catch(err =>{
//       console.log(err);
//    })
// })

// app.get('/blogs/create', (req,res)=>{
//     res.render('create', {title: 'create a new Blog'});
// });

//app.use()  // this function is used to create middleware and

app.use(blogRoutes);
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404', {title: '404'});
});
//use function is going to fire every single request coming in but only if the request reaches this point in the code