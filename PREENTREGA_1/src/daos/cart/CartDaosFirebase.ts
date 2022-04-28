import ContenedorFirebase from '../../contenedores/ContenedorFirebase'

export default class FirebaseProductos extends ContenedorFirebase {
  constructor(collection: any) {
    super(collection)
  }

  async getCart(id:string){
    try {
      const doc = await this.query.doc(id).get()
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data()
        return { ...data, id }
      }
    } catch (error) {
      throw new Error(`Error al listar uno: ${error}`)
    }
  }

  async createCart(){
    try {
      const doc = await this.query.add({timestamp: new Date().toISOString(), products:[]})
      return doc.id
    } catch (error) {
      throw new Error(`Error al crear: ${error}`)
    }
  }
  
 async addProductToCart(cartId:string, productId:string){
    
    try {
        
        const doc = await this.db.collection("products").doc(productId).get()
        if (!doc.exists) {
          throw new Error(`Error al listar por id: no se encontró`)
        } else {
          let data = doc.data()
          data= { ...data, _id:productId }

         
          console.log("PRODUCTOS TO SAVE")
           console.log(data)
          const doc2 = await this.query.doc(cartId).update({
             products: this.query2.FieldValue.arrayUnion(data)
           })
           return doc2
        }
       

     
    } catch (error) {
      throw new Error(`Error al agregar producto: ${error}`)
    }
  }

  async deleteProductFromCart(cartId:string, productId:string){
    try {
        let data:{}
        const prod = await this.db.collection("products").doc(productId).get()
        if (!prod.exists) {
          throw new Error(`Error al listar por id: no se encontró`)
        } else {
           data = prod.data()
          data= { ...data, _id:productId }
        }
      const doc = await this.query.doc(cartId).update({
        products: this.query2.FieldValue.arrayRemove(data)
      })
      return doc
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error}`)
    }
  }

  async listProductsOfCart(cartId: string){
    try {
      const doc = await this.query.doc(cartId).get()
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data()
        return {status:1, data:data.products}
      }
    } catch (error) {
      throw new Error(`Error al listar uno: ${error}`)
    }
  }


  
 }


  


