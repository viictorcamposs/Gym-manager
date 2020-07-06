const fs = require ('fs')
const data = require ('../../data.json')

// CREATE 
exports.post = function (req, res) {
  const keys = Object.keys (req.body)
  for ( key of keys ) {
    if ( req.body[key] == "" )
      return res.send ('Opa! É muito importante para nós da Net.Solutions e para seus futuros clientes que você preencha todos os campos. Assim podemos te conhecer melhor!')
  }

  // MANIPULANDO DATAS NO BACK-END
  req.body.birth = Date.parse (req.body.birth) 
  req.body.created_at = Date.now ()

  // [] (ENVIANDO DADOS PARA O MEU DATA.JSON (BACK-END) PELO FRONT-END)
  data.instructors.push (req.body) // [{...}, {...}]
  fs.writeFile ('data.json', JSON.stringify (data, null, 2), function (error) {
    if (error) {
      return res.send ('Write file error')
    }

    return res.redirect ('/instructors')
  })
}



// UPDATE 

// DELETE