import { Router } from "express";
import {Request, Response } from "express"
import CartController from "../controllers/CartController";
const router = Router();
import ProductsDaosFirebase from "../daos/products/ProductsDaosFirebase";
const ProductsFirebase = new ProductsDaosFirebase('products');
const CC = new CartController();

//CREAR CARRITO
router.post("/", async (req:Request,res:Response)=>{
    
    try {
     //   let msg = await CC.createCart();
     //   if(msg.status == -1){
     //        res.status(500).json({ error: "Error creando carrito" });
     //   }else{
     //        res.json({ error: false, msg: msg.data }).status(200); '2FFUY3bHBoiXFAxeGfW8vq'
     //   }

     let response = await ProductsFirebase.deleteAll();
     console.log(response)
     res.json({ error: false, msg: response }).status(200);
    } catch (error) {
         console.log(error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

//eliminar carrito
router.delete("/:id", async(req:Request,res:Response)=>{
    try {
        let msg = await CC.deleteCart(req.params.id);
        if(msg.status == -1){
             res.status(500).json({ error: "Error eliminando carrito" });
        }else{
             res.json({ error: false, msg:'Eliminado'}).status(200);
        }
     } catch (error) {
         res.status(500).json({ error: "Error del servidor" });
     }
})

//listar productos en carrito
router.get("/:id/productos", async(req:Request,res:Response)=>{
    try {
        let msg = await CC.listProducts(req.params.id);
        if(msg.status == -1){
             res.status(500).json({ error: "Error listando productos del carrito" });
        }else{
             res.json({ error: false, msg:msg.data}).status(200);
        }
     } catch (error) {
         res.status(500).json({ error: "Error del servidor" });
     }
})

//incorporar producto a carrito
router.post("/:id/productos", async (req:Request,res:Response)=>{
    try {
        let msg = await CC.addProductToCart(req.params.id,req.body.idProduct);
        if(msg.status == -1){
             res.status(500).json({ error: "Error agregando producto al carrito" });
        }else{
             res.json({ error: false}).status(200);
        }
     } catch (error) {
         res.status(500).json({ error: "Error del servidor" });
     }
})

//borrar producto de carrito
router.delete("/:id/productos/:id_prod", async (req:Request,res:Response)=>{
    try {
        let msg = await CC.deleteProductOfCart(req.params.id,req.params.id_prod);
        if(msg.status == -1){
             res.status(500).json({ error: "Error eliminando producto del carrito" });
        }else{
             res.json({ error: false}).status(200);
        }
     } catch (error) {
         res.status(500).json({ error: "Error del servidor" });
     }
     
})
export default router;
