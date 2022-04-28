import { captureRejectionSymbol } from 'events';
import ContenedorMongo from '../../contenedor/ContenedorMongo';
import { cart } from '../../models/cart';
import { products } from '../../models/products';
const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
export default class CarritoDaosMongo extends ContenedorMongo {
    constructor(ruta: string) {
        super(ruta);
    }

    async createCart() {
        try {
            const date = new Date();

            //@ts-ignore
            const cartSavedModel = new cart({timestamp: date.toLocaleDateString("es-ES", dateOptions), products: []});
            
            let cartdSave = await cartSavedModel.save();
            return cartdSave;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

   async addProductToCart(id:string, idProd:any) {
        try {
            let Cart = await cart.findById(id);
            let prod = await products.findById(idProd);
            Cart.products.push(prod);

            let CartUpdated = await cart.findByIdAndUpdate(id,
                
                Cart
            )
          
            return CartUpdated;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }


    async getCart(id:string) {
        try {
            let Cart = await cart.findById(id);
            return Cart;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    async updateProductOfCart(id:string, idProduct:string) {
        try {
            let Cart = await cart.findById(id);
            let prod = await products.findById(idProduct);
            const CartFinal =   Cart.products.map((item: any) => {
                if(item._id == idProduct){
                    item = prod;
                    console.log('COINCIDENCIA');
                    return item;
                }
               
            });
            Cart.products = CartFinal;
            console.log(' -------')
            console.log(prod);
            console.log(' -------')
            console.log('cartaFinal ' ,CartFinal)
            console.log(' -------')
            let CartUpdated = await cart.findByIdAndUpdate(
               id,
                
                    Cart
                
            )
            
            
            return CartUpdated;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    async deleteCart(id:string) {
        try {
            let Cart = await cart.findByIdAndDelete(id);
            return Cart;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }



    
}