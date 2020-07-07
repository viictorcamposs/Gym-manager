const express = require ('express')
const routes = express.Router ()
const instructors = require ('./public/scripts/instructors')
const data = require ('./data.json')

// MANIPULANDO PÁGINA HOME
routes.get ('/', function (req, res) {
  return res.render ('home')
})

// MANIPULANDO PÁGINA INSTRUCTORS 
  routes.get ('/instructors', function (req, res) {
    return res.render ('instructors/instructors', { data })
  })
  routes.get ('/instructors/create', function (req, res) {
    return res.render ('instructors/create')
  })
  routes.get ('/instructors/:id', instructors.show)

  routes.get ('/instructors/:id/edit', function (req,res) {
    return res.render ('instructors/edit', { data })
  })

  
  routes.post ('/instructors', instructors.post)

// MANIPULANDO PÁGINA MEMBERS
routes.get ('/members', function (req, res) {
  return res.render ('members/members')
})

// MANIPULANDO PÁGINA SIGN IN
routes.get ('/signin', function (req, res) {
  return res.render ('signin')
})

module.exports = routes