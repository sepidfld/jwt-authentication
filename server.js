const express = require('express');
const app = express();
const client = require ('./server/connection')
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
const path = require('path');
app.set('view engine', 'ejs'); // Replace 'ejs' with your preferred template engi
app.set('views', path.join(__dirname, 'views'));
//const authroute = require('./router')
//app.use('/',authroute);
app.use('/', require('./server/router'));
app.listen(3000, ()=> console.log('server is running'));
