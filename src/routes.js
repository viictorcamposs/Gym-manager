const express = require ('express')
const routes = express.Router ()
const instructors = require ('./app/controllers/instructors')
const members = require ('./app/controllers/members')

// MANIPULANDO PÁGINA HOME
routes.get ('/home', function (req, res) {
  return res.render ('home')
})

// MANIPULANDO PÁGINA INSTRUCTORS 
routes.get ('/instructors', instructors.index)
routes.put ('/instructors', instructors.put)
routes.post ('/instructors', instructors.post)
routes.delete ('/instructors', instructors.delete)
routes.get ('/instructors/create', instructors.create)
routes.get ('/instructors/:id', instructors.show)
routes.get ('/instructors/:id/edit', instructors.edit)




// MANIPULANDO PÁGINA MEMBERS
routes.put ('/members', members.put)
routes.post ('/members', members.post)
routes.delete ('/members', members.delete)
routes.get ('/members', members.index)
routes.get ('/members/create', members.create)
routes.get ('/members/:id', members.show)
routes.get ('/members/:id/edit', members.edit)

// MANIPULANDO PÁGINA SIGN IN
routes.get ('/signin', function (req, res) {
  return res.render ('signin')
})

module.exports = routes