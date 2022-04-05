import express from "express";
import morgan from "morgan";
import cors from "cors";

import routesProducts from "./routes/productos";
import routesCart from "./routes/carrito";
const app = express();

app.set('port',process.env.PORT || 8080);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/productos',routesProducts);
app.use('/api/carrito',routesCart);
app.use(function(req, res, next){
      res.status(404).json({ error : true, msg: `ruta ${req.url} método ${req.method} no implementada`}
      );   
})
app.listen(app.get('port'), () =>{
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
});

export default app;
