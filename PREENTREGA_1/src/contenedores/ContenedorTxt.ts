//import ProductsController from "./ProductsController";
import fs from 'fs';
//const PC = new ProductsController();


export default class CartController{
    path: any;

    constructor(path: any){
        this.path = path;
        
    }
    
    
   

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.path, "");
            return { status: 1 };
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }

    

    
}