module.exports = function(app){

	// visitor
	app.use('/', require('./controllers/index'));
	app.use('/users', require('./controllers/users'));

}