import ContenedorFirebase from '../../contenedores/ContenedorFirebase'

export default class FirebaseProductos extends ContenedorFirebase {
  constructor(collection: any) {
    super(collection)
  }

  async getProducts() {
    try {
        const result: any[] = []
        const snapshot = await this.query.get()
        snapshot.forEach((doc: { id: any; data: () => any }) => {
          result.push({ id: doc.id, ...doc.data() })
        })
        return result
      } catch (error) {
        throw new Error(`Error al listar todo: ${error}`)
      }
  }

  async createProduct(){
    try {
      const doc = await this.query.add({
        name: 'Producto 1',
        price: 100,
        stock: 10
      })
      return doc.id
    } catch (error) {
      throw new Error(`Error al crear: ${error}`)
    }
  }

  
}