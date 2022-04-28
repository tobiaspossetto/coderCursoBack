import ContenedorMongo from '../../contenedor/ContenedorMongo';
import { products } from '../../models/products';

export default class ProductosDaosMongo extends ContenedorMongo {
    constructor(ruta: string) {
        super(ruta);
    }

    async createProduct(product:any) {
        try {
            const prodSavedModel = new products(product)
            let prodSave = await prodSavedModel.save();
            return prodSave;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    async getProducts() {
        try {
            let AllProducts = await products.find();
            return AllProducts;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    async getProduct(id:string) {
        try {
            let Product = await products.findById(id);
            return Product;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    async updateProduct(id:string, product:any) {
        try {
            let Product = await products.findByIdAndUpdate(id, product);
            return Product;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    async deleteProduct(id:string) {
        try {
            let Product = await products.findByIdAndDelete(id);
            return Product;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    
}