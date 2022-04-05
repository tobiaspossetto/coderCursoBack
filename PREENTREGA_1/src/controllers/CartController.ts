import ProductsController from "./ProductsController";
import fs from 'fs';
const PC = new ProductsController();
const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
export default class CartController{
    
    async createCart(){
        try {

            let cart:any = {}
            //Si pudo leer el archivo, es porque existe, sino pasa al catch
            try {
              const date = new Date();
      
              await fs.promises.readFile("src/db/cart.txt");
              console.log(" existe el archivo");
              let data: any = await fs.promises.readFile("src/db/cart.txt");
              data = await JSON.parse(data);
              
                cart.id = data.length + 1;
                //@ts-ignore
                cart.timestamp = date.toLocaleDateString("es-ES", dateOptions);
                cart.productos = [];
      
              data.push(cart);
              // this.deleteAll()
              await fs.promises.writeFile(
                "src/db/cart.txt",
                JSON.stringify(data)
              );
            } catch (error) {
              console.log("No existe el archivo");
              cart.id = 1;
              const date = new Date();
              //@ts-ignore
              cart.timestamp = date.toLocaleDateString("es-ES", dateOptions);
              cart.productos = [];
              const carts = [];
              carts.push(cart);
              await fs.promises.writeFile(
                "src/db/cart.txt",
                JSON.stringify(carts)
              );
            }
      
            return { status: 1, data: cart.id};
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }
   async deleteCart(id:string){
    try {
        let data: any = await fs.promises.readFile("src/db/cart.txt");
        data = await JSON.parse(data);
        data = data.filter((cart: { id: any }) => cart.id != id);
  
        await fs.promises.writeFile("src/db/cart.txt", "");
        await fs.promises.writeFile("src/db/cart.txt", JSON.stringify(data));
        return { status: 1 };
      } catch (error) {
        console.log(error);
        //opte por -1 para responder con un 500
        return { status: -1 };
      }
    }

    async listProducts(id:string){
        try {
            let data: any = await fs.promises.readFile("src/db/cart.txt");
            data = await JSON.parse(data);
            const cart = data.filter((cart: { id: any }) => cart.id == id);
        
            return { status: 1, data: cart[0].productos };
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }

    async addProductToCart(idCart:string, idProduct:any){
        try {
           
            let prod = await PC.getProducts(idProduct);
            if(prod.status == -1){
                return {status: -1}
            }else{
                let carts:any = await fs.promises.readFile("src/db/cart.txt");
                carts = JSON.parse(carts);

                let cart = carts.filter((cart: { id: any }) => cart.id == idCart);
         
              cart[0].productos = [...cart[0].productos,prod.data[0]];
              
               
               let msg = await this.deleteCart(idCart);
                if(msg.status == -1){
                    return {status: -1}
                }else{
                  
                   carts = carts.filter((cart: { id: any }) => cart.id != idCart);
                    carts.push(cart[0]);
                await fs.promises.writeFile(
                    "src/db/cart.txt",
                    JSON.stringify(carts)
                  );

                  return {status: 1}}
            }
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }

    async deleteProductOfCart(idCart:string, idProduct:any){
        try {
            let carts:any = await fs.promises.readFile("src/db/cart.txt");
            carts = JSON.parse(carts);

            let cart = carts.filter((cart: { id: any }) => cart.id == idCart);
         
            cart[0].productos = cart[0].productos.filter((product: { id: any }) => product.id != idProduct);
            
            let msg = await this.deleteCart(idCart);
             if(msg.status == -1){
                 return {status: -1}
             }else{
                carts = carts.filter((cart: { id: any }) => cart.id != idCart);
                carts.push(cart[0]);
            await fs.promises.writeFile(
                "src/db/cart.txt",
                JSON.stringify(carts)
              );

              return {status: 1}}
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }

    

    
}