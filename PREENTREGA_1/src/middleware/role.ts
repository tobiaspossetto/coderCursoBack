import {Request, Response, NextFunction  } from "express"


export default function checkRole(req:Request,res:Response,next:NextFunction){
   try {
       const {role} = req.body;
       if(role === "admin"){
           next();
       }else{
           res.status(401).json({
               error: -1, descripcion: `ruta ${req.url}' metodo ${req.method} no autorizado`
           })
       }
   } catch (error) {
       console.error(error);
       res.json({error:'Error del servidor'}).status(500)
   }
    
}