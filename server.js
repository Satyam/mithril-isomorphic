var express =       require('express')
    , http =        require('http')
    , path =        require('path');

var app = module.exports = express();

app.use(require('cookie-parser')());
app.use(require('body-parser')());

// all configuration settings are set to their default values
// just for the purpose of documenting them.
app.use(require('mithril-isomorphic')({
	app: './app', 
	routes: 'routes.js', 
	page: 'index.html', 
	root: 'client',
	script: '__.js'
}));
app.use(express.static(path.join(__dirname, 'client')));


app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
