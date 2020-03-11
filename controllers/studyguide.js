/*
Restful Routes
#	Action	|URL	                  |HTTP Verb	|EJS view 	|mongoose method
1	Index	  |/studyguide/           |GET        |index.ejs  |Guide.find()
2	Show	  |/studyguide/:id        |GET        |show.ejs   |Guide.findById()		
3	New	    |/studyguide/new        |GET        |new.ejs	  |none
4	Create	|/studyguide/	          |POST       |none       |Guide.create(req.body)
5	Edit	  |/studyguide/:id/edit	  |GET        |edit.ejs   |Guide.findById()
6	Update	|/studyguide/:id        |PUT        |none       |Guide.findByIdAndUpdate()
7	Destroy	|/studyguide/:id        |DELETE     |none       |Guide.findByIdAndDelete()	
*/



const express = require('express')
const router = express.Router()
const Guide = require("../models/studyguide.js");
const session = require('express-session')

// ROUTES

//JSON Route
router.get("/json", (req,res) => {
    Guide.find({}, (error, guides) => {

        return res.json(guides)
  })
})

// NEW
router.get("/new", (req, res) =>{
    res.render("guides/new.ejs")
})

// DELETE
router.delete("/:id", (req, res) =>{
  Guide.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/studyguide')
  })
})


// EDIT Expanded - edits an individual question, :id is the guide id, :question is number in the guide_array
router.get('/:id/edit/list/:question', (req,res) =>{

  Guide.find({}, (error, guides) => {
    let guide
    //need to get all guides so that we can list them in nav bar
    //this is how we also pull the guide we are working with on the show page
    //cycle through all guides and match by element.id
    for (let element of guides){
        //console.log(element.id, req.params.id)
        if (element.id == req.params.id){
          guide = element
      }
      
    }
    console.log("Edit Route Guide is: ", guide)

    res.render("guides/edit.ejs", {
      guides: guides,
      guide: guide,
      question: guide.guide_data[req.params.question],
      question_number: req.params.question,
      currentUser: req.session.currentUser
    })

  })

  /*
  Guide.findById(req.params.id, (err, foundGuide) => {
    res.render(
      'guides/edit.ejs',
      {
        guides: foundGuide, //all study guide info. Used in Nav panel
        question: foundGuide.guide_data[req.params.question], //just the selected study guide
        question_number: req.params.question //position in the array of questions for that study guide
      }
    )
  })
  */
})

// EDIT Expanded - gets list of questions
router.get('/:id/edit/list', (req,res) =>{
  
  Guide.find({}, (error, guides) => {
      let guide
      //need to get all guides so that we can list them in nav bar
      //this is how we also pull the guide we are working with on the show page
      //cycle through all guides and match by element.id
      for (let element of guides){
          //console.log(element.id, req.params.id)
          if (element.id == req.params.id){
            guide = element
        }
        
      }

      res.render("guides/editlist.ejs", {
        guides: guides,
        guide: guide,
        currentUser: req.session.currentUser
      })

  })


})



// EDIT
// For adding new questions to existing study guide
router.get('/:id/edit', (req,res) =>{

  Guide.find({}, (error, guides) => {
    let guide
    //need to get all guides so that we can list them in nav bar
    //this is how we also pull the guide we are working with on the show page
    //cycle through all guides and match by element.id
    for (let element of guides){
        //console.log(element.id, req.params.id)
        if (element.id == req.params.id){
          guide = element
      }
      
    }

    res.render("guides/edit.ejs", {
      guides: guides,
      guide: guide,
      question: {id: "", question: "", answers: "", correct_answer:""},
      question_number: "",
      currentUser: req.session.currentUser
    })

})

  /*
  Guide.findById(req.params.id, (err, foundGuide) => {
    res.render(
      'guides/edit.ejs',
      {
        guides: foundGuide,
        //passing blank question properties
        question: {id: "", question: "", answers: "", correct_answer:""},
        question_number: "",
        currentUser: req.session.currentUser
      }
    )
  })
  */
})

// UPDATE for modifying existing question in quide
// similiar to other UPDATE route but takes question id which the order question is positioned in array of questions
router.put('/:id/newquestion/:questionid', (req, res)=>{

  //splits potential answers by return then creates an array of objects before submitting that to mongodb
  let formattedAnswers = []
  let splitAnswers = req.body.answers.split("\n")
      
  for (i=0; i<splitAnswers.length; i++){
    formattedAnswers[i] = splitAnswers[i]
  }
  console.log(formattedAnswers)
  console.log("updating existing question, question id:", req.params.questionid)

  //need to lookup guide then need to work specific question within guide. Before running query need to get object that we will then pass into the query
  //req.params.questionid is the array index we are working with
  let mongoVar = 'guide_data.'+req.params.questionid
  let mongoVarObject = {}
  mongoVarObject[mongoVar] = 
    {question: req.body.question,
    correct_answer: req.body.correct_answer,
    answers: formattedAnswers}
  console.log(mongoVarObject)

  //now run the query
  Guide.findByIdAndUpdate(req.params.id, 
    {$set:mongoVarObject}
    , {new:true}, (err,updateUser) => {
      res.redirect(`/studyguide/${req.params.id}/edit`)
      })
})


// UPDATE for adding question to guide
router.put('/:id/newquestion/', (req, res)=>{
  //splits potential answers by return then creates an array of objects before submitting that to mongodb
  let formattedAnswers = []
  let splitAnswers = req.body.answers.split("\n")
      
  for (i=0; i<splitAnswers.length; i++){
    formattedAnswers[i] = splitAnswers[i]
  }
  console.log(formattedAnswers)

  //finds matching study guide and pushes in a question
   Guide.findByIdAndUpdate(req.params.id, 
    {
      $push: 
    {
      guide_data: 
        {
          question: req.body.question,
          correct_answer: req.body.correct_answer,
          answers: formattedAnswers
        }
    }}, {new:true}, (err,updateUser) => {
      res.redirect(`/studyguide/${req.params.id}/edit`)
       })
  })


// Create
router.post("/", (req,res) =>{

    Guide.create(req.body, (err, guide) => {
      if (err) return err
      res.redirect(`/studyguide/${guide.id}/edit`)
    })
    
})

// Index
router.get("/", (req,res) => {
      Guide.find({}, (error, guides) => {
        res.render("index.ejs", {
          guides: guides,
          currentUser: req.session.currentUser
        })
      })
})

//SEED DATA ROUTE
router.get('/seed', async (req, res) => {

    
    const questionSet0 = 
    [
        {
            question: "Who was the first United States president?",
            answers: ["Ben Franklin", "George Washington", "Thomas Jefferson", "Ben Franklin"],
            correct_answer: 1
        },
        {
            question: "Who was the second United States president?",
            answers: ["John Adams", "John Quincy Adams", "Samuel Adams", "Adam Adams"],
            correct_answer: 0
        } 
    ]  

    const questionSet1 = 
    [
        {
            question: "How many provinces and territories make up Canada?",
            answers: ["10", "11", "12", "13"],
            correct_answer: 3
        },
        {
            question: "Which has the largest land area?",
            answers: ["Ontario", "Quebec", "Northwest Territories", "Nunavut"],
            correct_answer: 3
        } 
    ]  

    const newGuide =
      [
        {
            guide_name: "Sample Quiz 1",
            description: "A sample test",
            guide_data:  questionSet0
        }
        ,
        {
            guide_name: "Sample Quiz 2",
            description: "A sample test",
            guide_data: questionSet1
        }

      ]
  
    try {
      const seedItems = await Guide.create(newGuide)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
    res.redirect('/guides')
  })

  
// Show
router.get("/:id", (req, res) => {

   Guide.find({}, (error, guides) => {
     let guide

     //need to get all guides so that we can list them in nav bar
     //this is how we also pull the guide we are working with on the show page
     //cycle through all guides and match by element.id
    for (let element of guides){
      console.log(element.id, req.params.id)
      if (element.id == req.params.id){
        guide = element
      }
      
    }
    console.log(guide.guide_name)
    console.log(req.session.currentUser)
    res.render("show.ejs", {
      guides: guides,
      guide: guide,
      currentUser: req.session.currentUser
    })
  })


})

module.exports = router;