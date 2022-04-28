import ContenedorLocal from "../../contenedores/ContenedorTxt";
import fs from "fs";
//"src/db/productos.txt"
export default class ProductsDaosLocal extends  ContenedorLocal{
    constructor(path:any){
        super(path);
    }

    async addProduct(product: any, id?: string) {
        try {
          //Si pudo leer el archivo, es porque existe, sino pasa al catch
          try {
            const date = new Date();
    
            await fs.promises.readFile(this.path);
            console.log(" existe el archivo");
            let data: any = await fs.promises.readFile(this.path);
            data = await JSON.parse(data);
            if (id) {
              product.id = parseInt(id);
            } else {
              product.id = data.length + 1;
            }
    
            if (!id) {
              //@ts-ignore
              product.timestamp = new Date().toISOString();
            }
    
            data.push(product);
            // this.deleteAll()
            await fs.promises.writeFile(
              "src/db/productos.txt",
              JSON.stringify(data)
            );
          } catch (error) {
            console.log("No existe el archivo");
            product.id = 1;
            const date = new Date();
            //@ts-ignore
            product.timestamp = new Date().toISOString();
            const products = [];
            products.push(product);
            await fs.promises.writeFile(
              "src/db/productos.txt",
              JSON.stringify(products)
            );
          }
    
          return { status: 1 };
        } catch (error) {
          console.log(error);
          //opte por -1 para responder con un 500
          return { status: -1 };
        }
      }
    
      async getProducts(id?: string) {
        try {
          try {
            let data: any = await fs.promises.readFile(this.path);
            data = await JSON.parse(data);
            if (id) {
              const product = data.filter((prod: { id: any }) => prod.id == id);
              return { status: 1, data: product };
            } else {
              return { status: 1, data: data };
            }
          } catch (error) {
            return { status: 1, data: [] };
          }
        } catch (error) {
          console.log(error);
          //opte por -1 para responder con un 500
          return { status: -1 };
        }
      }
    
      async editProducts(id: string, newData: any) {
        try {
          let data: any = await fs.promises.readFile(this.path);
          data = await JSON.parse(data);
    
          let prod = await this.getProducts(id);
          if (prod.status == -1) {
            return { status: -1 };
          } else {
            
            newData.timestamp = prod.data[0].timestamp;
         
            let res = await this.deleteProducts(id);
            if (res.status == -1) {
              return { status: -1 };
            } else {
              let res = await this.addProduct(newData, id);
              if (res.status == -1) {
                return { status: -1 };
              } else {
                return { status: 1 };
              }
            }
          }
        } catch (error) {
          console.log(error);
          //opte por -1 para responder con un 500
          return { status: -1 };
        }
      }
    
      async deleteProducts(id: string) {
        try {
          let data: any = await fs.promises.readFile(this.path);
          data = await JSON.parse(data);
    
          data = data.filter((prod: { id: any }) => prod.id != id);
    
          await fs.promises.writeFile(this.path, "");
          await fs.promises.writeFile(this.path, JSON.stringify(data));
    
          return { status: 1 };
        } catch (error) {
          console.log(error);
          //opte por -1 para responder con un 500
          return { status: -1 };
        }
      }
}