import  Mongoose from "mongoose";

export default class ContenedorMongo {
    ruta: string;
    constructor(ruta:string) {
        this.ruta = ruta;
    }
    public async conectar() {
        try {
            await Mongoose.connect(this.ruta, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
            console.log("MongoDB Connected");
        } catch (error) {
            console.log(error);
        }
    }

    public async desconectar() {
        try {
            await Mongoose.disconnect();
            console.log("MongoDB Disconnected");
        } catch (error) {
            console.log(error);
        }
    }

   

}