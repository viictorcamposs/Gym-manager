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



// UPDATE 

// DELETE