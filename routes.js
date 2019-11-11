module.exports = function(app){

	// visitor
	app.use('/', require('./controllers/index'));
	app.use('/', require('./controllers/auth'));
	app.use('/users', require('./controllers/users'));
	
	
	// admin
	app.use('/protected', require('./controllers/protected'));
	

}