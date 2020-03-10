const express = require('express')
const router = express.Router()
const Guide = require("../models/studyguide.js");


// ROUTES

//JSON Route
router.get("/json", (req,res) => {
    Guide.Guide.find({}, (error, guides) => {

        return res.json(guides)
  })
})

// NEW
router.get("/new", (req, res) =>{
    res.render("guides/new.ejs")
})

// DELETE
router.delete("/:id", (req, res) =>{
  Guide.Guide.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/studyguide')
  })
})


// EDIT Expanded - edits an individual question
router.get('/:id/edit/list/:question', (req,res) =>{
  Guide.Guide.findById(req.params.id, (err, foundGuide) => {
    //console.log(req.params.id, foundGuide)
    res.render(
      'guides/edit.ejs',
      {
        guides: foundGuide,
        question: foundGuide.guide_data[req.params.question]
      }
    )
  })
})

// EDIT Expanded - gets list of questions
router.get('/:id/edit/list', (req,res) =>{
  Guide.Guide.findById(req.params.id, (err, foundGuide) => {
    //console.log(req.params.id, foundGuide)
    res.render(
      'guides/editlist.ejs',
      {
        guides: foundGuide
      }
    )
  })
})



// EDIT
router.get('/:id/edit', (req,res) =>{
  Guide.Guide.findById(req.params.id, (err, foundGuide) => {
    //console.log(req.params.id, foundGuide)
    res.render(
      'guides/edit.ejs',
      {
        guides: foundGuide,
        //passing blank question properties
        question: {id: "", question: "", answers: "", correct_answer:""}
      }
    )
  })
})

// PUT for modifying existing question in quide
// similiar to PUT route but takes question id
router.put('/:id/newquestion/:questionid', (req, res)=>{

  //splits potential answers by return then creates an array of objects before submitting that to mongodb
  let formattedAnswers = []
  let splitAnswers = req.body.answers.split("\n")
      
  for (i=0; i<splitAnswers.length; i++){
    formattedAnswers[i] = splitAnswers[i]
  }
  console.log(formattedAnswers)
  console.log("updating existing question, question id:", req.params.questionid)
  //finds matching study guide and pushes in a question

  Guide.Question.find({}, (error, questions) => {
    console.log(questions)
  })
  
  
  /*
  Question.findById({req.params.question}, (error, questions) => {
    console.log(questions)
  })
  */

  /*
  Guide.Question.findByIdAndUpdate(req.params.questionid, 
    {
          guide_question: req.body.question,
          correct_answer: req.body.correct_answer,
          answers: formattedAnswers
    }
    , {new:true}, (err,updateUser) => {
      //console.log(updateUser)
      res.redirect(`/studyguide/${req.params.id}/edit`)
          })
*/

      
  })


// PUT for adding question to guide
router.put('/:id/newquestion/', (req, res)=>{
  //splits potential answers by return then creates an array of objects before submitting that to mongodb
  let formattedAnswers = []
  let splitAnswers = req.body.answers.split("\n")
      
  for (i=0; i<splitAnswers.length; i++){
    formattedAnswers[i] = splitAnswers[i]
  }
  console.log(formattedAnswers)

  //finds matching study guide and pushes in a question
   Guide.Guide.findByIdAndUpdate(req.params.id, 
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

  /*
// PUT
router.put('/:id', (req, res)=>{
  Guide.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
    res.redirect('/guides')
  })
})
*/

// Create
router.post("/", (req,res) =>{

    Guide.Guide.create(req.body, (err, guide) => {
      if (err) return err
      res.redirect(`/studyguide/${guide.id}/edit`)
    })
    
})

// Index
router.get("/", (req,res) => {
      Guide.Guide.find({}, (error, guides) => {
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
      const seedItems = await Guide.Guide.create(newGuide)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
    res.redirect('/guides')
  })

  
// Show
router.get("/:id", (req, res) => {

   Guide.Guide.find({}, (error, guides) => {
     let guide
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