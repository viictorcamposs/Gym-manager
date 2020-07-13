const fs = require ('fs')
const data = require ('../data.json')
const { age, date } = require ('../public/scripts/date')

// INDEX
exports.index = function (req, res) {
  return res.render ('instructors/instructors', { instructors: data.instructors })
}

// CREATE
exports.create = function (req, res) {
  return res.render ('instructors/create')
}

// POST (HTTP)
exports.post = function (req, res) {
  const keys = Object.keys (req.body)
  for ( key of keys ) {
    if ( req.body[key] == "" )
      return res.send ('Opa! É muito importante para nós da Net.Solutions e para seus futuros clientes que você preencha todos os campos. Assim podemos te conhecer melhor!')
  }

  // MANIPULANDO DATAS NO BACK-END
  let { avatar_url, birth, name, services, gender } = req.body

  birth = Date.parse (birth) 
  const created_at = Date.now ()
  const id = Number (data.instructors.length + 1)

  // [] (ENVIANDO DADOS PARA O MEU DATA.JSON (BACK-END) PELO FRONT-END)
  data.instructors.push ({
    id, 
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  }) // [{...}, {...}]
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function (error) {
    if (error) {
      return res.send ('Write file error')
    }

    return res.redirect ('/instructors')
  })
}

// SHOW 
exports.show = function (req, res) {
  const { id } = req.params
  const foundInstructor = data.instructors.find ( function (instructor) {
    return instructor.id == id 
  })   
  if ( !foundInstructor ) return res.send ('Instructor not found!')

  const instructor = {
    ...foundInstructor,
    age: age (foundInstructor.birth),
    services: foundInstructor.services.split (","),
    created_at: new Intl.DateTimeFormat ("en-GB").format (foundInstructor.created_at)
  }

  return res.render ('instructors/show', { instructor })
}

// EDIT 
exports.edit = function (req,res) {
  const { id } = req.params
  const foundInstructor = data.instructors.find ( function (instructor) {
    return instructor.id == id 
  })   
  if ( !foundInstructor ) return res.send ('Instructor not found!') 
    
  const instructor = {
    ...foundInstructor,
    birth: date (foundInstructor.birth).iso
  }
  return res.render ('instructors/edit', { instructor })
}

// PUT (HTTP)
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0
  const foundInstructor = data.instructors.find ( function (instructor, foundIndex) {
    if ( id == instructor.id ) {
      index = foundIndex
      return true
    }
  })   
  if ( !foundInstructor ) return res.send ('Instructor not found!') 

  const instructor = {
    ...foundInstructor,
    ...req.body, 
    birth: Date.parse (req.body.birth),
    id: Number (req.body.id)
  }

  data.instructors[index] = instructor
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function ( err ) {
    if ( err ) return res.send ('write error!')

    return res.redirect (`/instructors/${id}`)
  })
}

// DELETE (HTTP)
exports.delete = function (req, res) {
  const { id } = req.body
  const filteredInstructors = data.instructors.filter (function (instructor) {
    return instructor.id != id
  })
  data.instructors = filteredInstructors
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function ( err ) {
    if ( err ) return res.send ('Write file error!')
    return res.redirect ('/instructors')
  })
}