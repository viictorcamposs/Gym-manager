const Member = require ('../models/Member')
const { age, date } = require ('../../lib/utils')

module.exports = {
	index ( req, res ) {
		Member.all ( function ( members ) {
			return res.render ('members/members', { members })
		})
	}, 
	create ( req, res ) {
		Member.instructorsSelectOptions ( function ( options ) {
			return res.render ('members/create-member', { instructorsOptions: options })
		})
	},
	post ( req, res ) {
		const keys = Object.keys (req.body)
		for ( key of keys ) {
		  if ( req.body[key] == "" )
			return res.send ('Opa! É muito importante que você preencha todos os campos.')
		}
	
		Member.create ( req.body, function ( member ) {
			return res.redirect ( `/members/${ member.id }` ) 
		})
	},
	show ( req, res ) {
		Member.find ( req.params.id, function ( member ) {
			if ( !member ) return res.send ( 'Member not found' )
			member.birth = date ( member.birth ).birthDay
			return res.render ( 'members/show-member', { member }) 
		})
	},
	edit ( req, res ) {
		Member.find ( req.params.id, function ( member ) {
			if ( !member ) return res.send ( 'Member not found' )
			member.birth = date ( member.birth ).iso
			Member.instructorsSelectOptions ( function ( options ) {
				return res.render ('members/edit-member', { member, instructorsOptions: options })
			})
		})
	},
	put ( req, res ) {
		const keys = Object.keys (req.body)
		for ( key of keys ) {
		  if ( req.body[key] == "" )
			return res.send ('Opa! É muito importante que você preencha todos os campos.')
		}
		Member.update ( req.body, function () {
			return res.redirect ( `/members/${ req.body.id }`)
		})
	},
	delete ( req, res ) {
		Member.delete ( req.body.id, function () {
			return res.redirect ( '/members' )
		})
	},
}