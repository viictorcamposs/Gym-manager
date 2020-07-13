const fs = require ('fs')
const data = require ('../data.json')
const { date } = require ('../public/scripts/date')

// INDEX
exports.index = function (req, res) {
  return res.render ('members/members', { members: data.members })
}

// CREATE
exports.create = function (req, res) {
  return res.render ('members/create-member')
}

// POST (HTTP)
exports.post = function (req, res) {
  const keys = Object.keys (req.body)
  for ( key of keys ) {
    if ( req.body[key] == "" )
      return res.send ('Opa! É muito importante para nós da Net.Solutions e para seus futuros clientes que você preencha todos os campos. Assim podemos te conhecer melhor!')
  }

  birth = Date.parse (req.body.birth)
  
  let id = 1  
  const lastMember = data.members [data.members.length - 1]
  
  if (lastMember) {
    id = lastMember.id + 1
  }

  // [] (ENVIANDO DADOS PARA O MEU DATA.JSON (BACK-END) PELO FRONT-END)
  data.members.push ({
  id,
  ...req.body,
  birth
  }) // [{...}, {...}]
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function (error) {
    if (error) {
      return res.send ('Write file error')
    }

    return res.redirect ('/members')
  })
}

// SHOW 
exports.show = function (req, res) {
  const { id } = req.params
  const foundMember = data.members.find ( function (member) {
    return member.id == id 
  })   
  if ( !foundMember ) return res.send ('Member not found!')

  const member = {
    ...foundMember,
    birth: date (foundMember.birth).birthDay
  }

  return res.render ('members/show-member', { member })
}


// EDIT 
exports.edit = function (req,res) {
  const { id } = req.params
  const foundMember = data.members.find ( function (member) {
    return member.id == id 
  })   
  if ( !foundMember ) return res.send ('Member not found!') 
    
  const member = {
    ...foundMember,
    birth: date (foundMember.birth).iso
  }
  return res.render ('members/edit-member', { member })
}

// PUT (HTTP)
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0
  const foundMember = data.members.find ( function (member, foundIndex) {
    if ( id == member.id ) {
      index = foundIndex
      return true
    }
  })   
  if ( !foundMember ) return res.send ('Member not found!') 

  const member = {
    ...foundMember,
    ...req.body, 
    birth: Date.parse (req.body.birth),
    id: Number (req.body.id)
  }

  data.members[index] = member
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function ( err ) {
    if ( err ) return res.send ('write error!')

    return res.redirect (`/members/${id}`)
  })
}

// DELETE (HTTP)
exports.delete = function (req, res) {
  const { id } = req.body
  const filteredMembers = data.members.filter (function (member) {
    return member.id != id
  })
  data.members = filteredMembers
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function ( err ) {
    if ( err ) return res.send ('Write file error!')
    return res.redirect ('/members')
  })
}