import admin from 'firebase-admin'

var serviceAccount = require("../key/node-test-329a9-firebase-adminsdk-i5m50-3a621db61e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-test-329a9.firebaseio.com"
})

export default class ContenedorFirebase {
  db: any;
query: any;

  constructor(collect: any) {
    this.db = admin.firestore()
    this.query = this.db.collection(collect)
  }

 

  async listAll() {
    try {
      const result: any[] = []
      const snapshot = await this.query.get()
      snapshot.forEach((doc: { id: any; data: () => any; }) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async listOne(id: any) {
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


  async deleteOne(id: string) {
    try {
      const doc = await this.query.doc(id).delete()
      return doc
    } catch (error) {
      throw new Error(`Error al eliminar uno: ${error}`)
    }
  }


  async deleteAll(){
    try {
      const snapshot = await this.query.get()
      snapshot.forEach((doc: { id: any; }) => {
        this.query.doc(doc.id).delete()
      })
      return true
    } catch (error) {
      throw new Error(`Error al eliminar todo: ${error}`)
    }
  }

  

  
}