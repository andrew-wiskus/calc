var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var calc = require('./routes/calc.js');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/calc', calc);

app.get('/*', function(req, res) {
    var file = req.params[0] || '/view/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('server is running on port', app.get('port'));

});
