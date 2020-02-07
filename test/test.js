const path = require('path');
const openterm = require('../build/index.js');

openterm.shell(`node ${path.join(__dirname,'./myScript.js')}`);
// openterm.file(path.join(__dirname,'./myScript.sh'));
// openterm.file(path.join(__dirname,'./myScript.js'));
// openterm.file(path.join(__dirname,'./myScript'));