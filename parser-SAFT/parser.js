
fs = require('fs');
var parser = require('xml2json');

fs.readFile( './SAFT_2019.xml', function(err, data) {
    var json = parser.toJson(data);
    //data has saft in json
 });