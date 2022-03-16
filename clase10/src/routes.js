const express = require('express');
const router = express.Router();
const Controller = require('./controller');


router.get('/', (req, res) => {
    res.render('form',{nombre:'tobias'});
})


router.get('/productos', async (req, res) => {
  try {
      let data = await Controller.getProducts();
      res.render('products', {data, exits:data.length>0?true:false});
  } catch (error) {
      console.log(error)
      res.json({error:'Ocurrio un error'}).status(500);
  }     
   
})


router.get('/api/productos/:id', async (req, res) => {
    try {
        console.log(req.params.id)
       let response = await Controller.getProduct(req.params.id);
      if(response.length > 0) {
        res.json({data:response}).status(200);
      }else{
        res.json({error:"Objeto no encontrado"}).status(404);
      }
         
    } catch (error) {
        console.log(error)
        res.json({error:'Ocurrio un error'}).status(500);
    }
})


router.post('/api/productos', async (req, res) => {
    try {
        const {price,title, thumbnail} = req.body;
        if(price === '' || title === '' || thumbnail === ''){
            res.json({error:'error al crear'}).status(500);
        }else{
            const prod = {price ,title,thumbnail}
            let status = await Controller.createProduct(prod);
            if(status){
                let data = await Controller.getProducts();
                console.log(data)
                res.redirect('/');
            
            }else{
                res.json({error:'error al crear'}).status(500);
            }
        }
      
    } catch (error) {
        console.log(error)
        res.json({error:'Ocurrio un error'}).status(500);
    }
})


router.put('/api/productos/:id', async (req, res) => {
    try {
        const {price, title, thumbnail} = req.body;
        let status = await Controller.updateProduct(req.params.id,{price,title,thumbnail});
       if(status){
           res.json({msg:'Actualizado'}).status(200);
       }else{
             res.json({error:'Objeto no encontrado'}).status(404);
       }
     } catch (error) {
         console.log(error)
         res.json({error:'Ocurrio un error'}).status(500);
     }
})

router.delete('/api/productos/:id', async (req, res) => {
    try {
       let status = await Controller.deleteProduct(req.params.id);
      if(status){
          res.json({msg:'Borrado'}).status(200);
      }else{
            res.json({error:'Objeto no encontrado'}).status(404);
      }
    } catch (error) {
        console.log(error)
        res.json({error:'Ocurrio un error'}).status(500);
    }
})

module.exports = router;