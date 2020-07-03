const express = require ('express')
const routes = express.Router ()

routes.get ('/', function (req, res) {
  return res.render ('home')
})

// MANIPULANDO PÁGINA INSTRUCTORS 
  routes.get ('/instructors', function (req, res) {
    return res.render ('instructors/instructors')
  })
  routes.get ('/instructors/create', function (req, res) {
    return res.render ('instructors/create')
  })
  routes.post ('/instructors', function (req, res) {
    return res.send ('OK')
  })



routes.get ('/members', function (req, res) {
  return res.render ('members/members')
})

routes.get ('/signin', function (req, res) {
  return res.render ('signin')
})

module.exports = routes