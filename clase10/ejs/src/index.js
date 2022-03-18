const express = require('express');
const morgan = require('morgan');
const handlebars= require( 'express-handlebars');

const app = express();


 
//settings 
app.set('port',process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('views', './src/views');
app.set('view engine', 'ejs')
// Routes
app.use('/',require('./routes'))

//start
app.listen(app.get('port'), () =>{
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
});