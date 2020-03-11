//https://git.generalassemb.ly/ira/SEIR-FLEX-123/tree/master/projects/project_2



const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const session = require('express-session')
const mongoURI = process.env.MONGODB_URI

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(session({
  secret: "bananaPants", //some random string
  resave: false,
  saveUninitialized: false
}));

// Connect mongoose to mongo db's:
let uristring = 
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost:27017/study_guide'

mongoose.connect(uristring, (err, res) => {
  if (err) {
    console.log ("ERROR connecting to: " + uristring + ". " + err + " Process.env.MONGOLAB_URI is " + process.env.MONGODB_URI + " Process.env.MONGOHQ_URL is " + process.env.MONGOHQ_URL);
  } else {
    console.log("Succedded connected to: " + uristring)
  }
},

{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
    console.log("connected to mongo");
  });


//required controllers:
const guidesController = require('./controllers/studyguide.js')
app.use('/studyguide', guidesController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//for logged in users only
app.get('/app', (req, res)=>{
  if(req.session.currentUser){
      res.send('the party');
  } else {
      res.redirect('/sessions/new');
  }
});

app.get('/', (req,res) =>{
    res.redirect('/studyguide')
})

/*
app.post('/articles', (req, res)=>{
    req.body.author = req.session.currentUser.username;
    Article.create(req.body, (err, createdArticle)=>{
        res.redirect('/articles');
    });
});
*/

// web server
app.listen(PORT, () => {
    console.log("listening on port ", PORT)
})