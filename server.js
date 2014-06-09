var express =       require('express')
    , http =        require('http')
    , path =        require('path');

var app = module.exports = express();

// This is it:
app.use(require('mithril-isomorphic')());

app.use(express.static(path.join(__dirname, 'client')));


app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
