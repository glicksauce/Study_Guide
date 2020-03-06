//https://git.generalassemb.ly/ira/SEIR-FLEX-123/tree/master/projects/project_2

/*
Restful Routes
#	Action	|URL	                |HTTP Verb	|EJS view 	|mongoose method
1	Index	|/studyguide/           |GET        |index.ejs  |Guide.find()
2	Show	|/studyguide/:id        |GET        |show.ejs   |Guide.findById()		
3	New	    |/studyguide/new        |GET        |new.ejs	|none
4	Create	|/studyguide/	        |POST       |none       |Guide.create(req.body)
5	Edit	|/studyguide/:id/edit	|GET        |edit.ejs   |Guide.findById()
6	Update	|/studyguide/:id        |PUT        |none       |Guide.findByIdAndUpdate()
7	Destroy	|/studyguide/:id        |DELETE     |none       |Guide.findByIdAndDelete()	
*/

const express = require('express')
const app = express()
const port = 3000;
const mongoose = require("mongoose")
const methodOverride = require("method-override")

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
//app.use(express.json())

// Connect mongoose to mongo db:
mongoose.connect("mongodb://localhost:27017/study_guide", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
    console.log("connected to mongo");
  });


const guidesController = require('./controllers/studyguide.js')
app.use('/studyguide', guidesController)


app.get('/', (req,res) =>{
    res.redirect('/studyguide')
})

// web server
app.listen(port, () => {
    console.log("listening on port ", port)
})