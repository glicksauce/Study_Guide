const express = require('express')
const router = express.Router()
const Guide = require("../models/studyguide.js");

// ROUTES

//JSON Route
router.get("/json", (req,res) => {
    Guide.find({}, (error, guides) => {

        return res.json(guides)
  })
})

// NEW
router.get("/new", (req, res) =>{
    res.render("new.ejs")
})

// DELETE
router.delete("/:id", (req, res) =>{
  Guide.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/guides')
  })
})

// EDIT
router.get('/:id/edit', (req,res) =>{
  Guide.findById(req.params.id, (err, foundGuide) => {
    res.render(
      'edit.ejs',
      {
        guides: foundGuide
      }
    )
  })
})

// PUT for Buy
router.put('/:id/buy', (req, res)=>{
   Guide.findById(req.params.id, (error, guide) => {
    User.findByIdAndUpdate('5e5d465c8424640fc0989893', {$push: {shopping_cart: guide.name}}, {new:true}, (err,updateUser) =>{

    })
   })
    Guide.findByIdAndUpdate(req.params.id, {$inc: {qty: -1}}, {new:true}, (err,updateModel) =>{
      res.redirect('/guides')
    })

  })

// PUT
router.put('/:id', (req, res)=>{
  Guide.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
    res.redirect('/guides')
  })
})

// Create
router.post("/", (req,res) =>{

    Guide.create(req.body)
    res.redirect("/guides")
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
    Guide.findById(req.params.id, (err, showGuides) => {
      res.render("show.ejs", {
        guides: showGuides
      })
    })
  })



module.exports = router;