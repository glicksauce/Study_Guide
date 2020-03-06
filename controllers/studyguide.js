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
          guides
        })
      })
})

//SEED DATA ROUTE
router.get('/seed', async (req, res) => {
    const newGuide =
      []
  
    try {
      const seedItems = await Guide.create(newGuides)
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