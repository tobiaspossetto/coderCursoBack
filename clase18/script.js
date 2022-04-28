//use ecommerce
db.createCollection("productos")
db.createCollection("mensajes")

//insert many  10 documents in productos collection
db.productos.insertMany([
    {
        "nombre": "Coca Cola",
        "descripcion": "Coca Cola",
        "precio": 340,
        "stock": 10,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "Fanta",
        "descripcion": "Fanta",
        "precio": 290,
        "stock": 30,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "Sprite",
        "descripcion": "Sprite",
        "precio": 400,
        "stock": 2,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "Acuarius Naranja",
        "descripcion": "Acuarius Naranja",
        "precio": 120,
        "stock": 3,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": " Limon",
        "descripcion": " Limon",
        "precio": 500,
        "stock": 32,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": " Cerveza",
        "descripcion": " Cerveza",
        "precio": 320,
        "stock": 10,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "vino ",
        "descripcion": "vino ",
        "precio": 400,
        "stock": 10,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "Fernet",
        "descripcion": "Fernet",
        "precio": 500,
        "stock": 10,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "Vodka",
        "descripcion": "Vodka",
        "precio": 700,
        "stock": 10,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    },
    {
        "nombre": "Whisky",
        "descripcion": "Whisky",
        "precio": 800,
        "stock": 10,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    }
])


db.mensajes.insertMany([
    {
        "correo": "asd@gmail.com", 
        "mensaje": "hola",
        "date": ISODate()
    },
    {
        "correo": "juan@gmail.com", 
        "mensaje": "holasafddasasd",
        "date": ISODate()
    },
    {
        "correo": "dasdas@gmail.com", 
        "mensaje": "cascasdasd",
        "date": ISODate()
    },
    {
        "correo": "asd@gmail.com", 
        "mensaje": "hola",
        "date": ISODate()
    },
    {
        "correo": "juan@gmail.com", 
        "mensaje": "holasafddasasd",
        "date": ISODate()
    },
    {
        "correo": "dasdas@gmail.com", 
        "mensaje": "cascasdasd",
        "date": ISODate()
    },
    {
        "correo": "asd@gmail.com", 
        "mensaje": "hola",
        "date": ISODate()
    },
    {
        "correo": "juan@gmail.com", 
        "mensaje": "holasafddasasd",
        "date": ISODate()
    },
    {
        "correo": "dasdas@gmail.com", 
        "mensaje": "cascasdasd",
        "date": ISODate()
    },
    {
        "correo": "asd@gmail.com", 
        "mensaje": "hola",
        "date": ISODate()
    }
   
])



db.productos.find()
db.mensajes.find()


db.productos.count();
db.mensajes.count();



//CRUD

db.productos.insert(
    {
        "nombre": "agua",
        "descripcion": "agua",
        "precio": 100,
        "stock": 3,
        "imagen": "https://www.coca-cola.es/content/dam/ccol/es/recetas/recetas-coca-cola/coca-cola-zero-es/coca-cola-zero-es-receta-coca-cola-zero-es-1.jpg"
    })

//consultas
db.productos.find({"precio":{$lt:1000}})


//filtrar productos con precio entre 1000 y 3000
db.productos.find({"precio":{$gt:1000,$lt:3000}})

//filtrar productos con  precio mayor a 3000
db.productos.find({"precio":{$gt:3000}})

// mostrar el nombre del tercer producto mas barato
db.productos.find({},{"nombre":1}).sort({"precio":1}).skip(2).limit(1)

//cambiar el stock de todos a 100
db.productos.updateMany({}, 
    {$set: {"stock": 100}},
    {multi: true })

//cambiar el stock de los que tienen un precio mayor a 4000 a 0
db.productos.updateMany({"precio":{$gt:4000}}, 
        {$set: {"stock": 0}},
        {multi: true })

//eliminar todos los documentos donde el precio sea menor a 1000
db.productos.deleteMany({"precio":{$lt:1000}})

db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            {
                role: "read",
                db: "ecommerce"
            }
        ]
    }
)