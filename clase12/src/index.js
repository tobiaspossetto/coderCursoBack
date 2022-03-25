const express = require('express');
const morgan = require('morgan');
const Controller = require('./controller');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


//settings 
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './src/views')
app.set('view engine', 'pug');
// Routes
app.use('/', require('./routes'))

//start
httpServer.listen(4000, function () {
    console.log("Servidor corriendo en http://localhost:4000");
  });




let productos = []

const callMsg = async () => {
    try {
        const mesagges = await Controller.getMessages()
        console.log(mesagges)
        return mesagges
    } catch (error) {
        console.error(error)
    }
   
}
callMsg()

//websockets 
io.on('connection', async (socket) => {
    console.log('new connection')
    
    socket.emit('PRODUCTS', productos)
    socket.on('NEW_PRODUCT', (data) =>{
       // console.log('llego nuevo prod')
        productos.push(data)

        io.sockets.emit('PRODUCTS', productos)
    })

    
    //chat

    socket.emit('MESSAGES', await callMsg())

    socket.on('NEW_MESSAGE', async (data) =>{
        //console.log(data)
        //console.log('llego nuevo mensaje')
       await Controller.saveMessage(data)
      // const msg = await Controller.getMessages()

        io.sockets.emit('MESSAGES',await  callMsg())
    })
    
})
















// const express = require('express');
// const morgan = require('morgan');

// const app = express();
// const SocketIO = require('socket.io')




// //settings 
// app.set('port', process.env.PORT || 4000);
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.set('views', './src/views')
// app.set('view engine', 'pug');
// // Routes
// app.use('/', require('./routes'))

// //start
// const server = app.listen(app.get('port'), () => {
//     console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
// });

// const socket = SocketIO(server)



// let productos = [{title:'sdadas', price:12, thumbnail:1},{title:'sdadas', price:12, thumbnail:2},{title:'sdadas', price:12, thumbnail:3}]

// //websockets 
// socket.on('connection', (sock) => {
//     console.log('new connection')
    
//     sock.emit('PRODUCTS', productos)
//     sock.on('NEW_PRODUCT', (data) =>{
//         console.log('llego nuevo prod')
//         productos.push(data)

//         sock.emit('PRODUCTS', productos)
//     })

    

    
// })