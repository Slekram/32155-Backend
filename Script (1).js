use ecommerce
db.createCollection("productos")
db.createCollection("mensajes")
db.createCollection("carrito")
db.productos.insertMany([{producto: "Flauta", precio: 200},
                        {producto: "Guitarra", precio: 500},
                        {producto: "Teclado", precio: 300},
                        {producto: "Xilofon", precio: 600},
                        {producto: "Triangulo", precio: 1000},
                        {producto: "Trompeta", precio: 2000},
                        {producto: "Piano", precio: 2500},
                        {producto: "Bajo", precio: 3000},
                        {producto: "Bateria", precio: 3500},
                        {producto: "Arpa", precio: 4500}])
db.mensajes.insertMany([{mail: "maxi@gmail.com", msg: "Hola"},
                        {mail: "martin@gmail.com", msg: "Hola"},
                        {mail: "maxi@gmail.com", msg: "Como te va?"},
                        {mail: "martin@gmail.com", msg: "Bien"},
                        {mail: "martin@gmail.com", msg: "Vos?"},
                        {mail: "maxi@gmail.com", msg: "Bien por suerte"},
                        {mail: "maxi@gmail.com", msg: "Este chat funciona bastante bien"},
                        {mail: "martin@gmail.com", msg: "Si, es todo un exito"},
                        {mail: "maxi@gmail.com", msg: "Chau"},
                         {mail: "martin@gmail.com", msg: "Chau"}])    
db.productos.find()                                             
db.mensajes.find()  
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()
db.productos.insertOne({producto: "Flautin", precio: 5000})
db.productos.find({precio:{$lt:1000}})  
db.productos.find({$and: [{precio:{$lte:3000}},{precio:{$gte:1000}}]})  
db.productos.find({precio:{$gt:3000}})  
db.productos.find({},{producto: 1}).sort({precio: 1}).limit(1).skip(2)
db.productos.updateMany({},{$set: {stock: 100}})
db.productos.updateMany({precio:{$gt:4000}},{$set: {stock: 0}})
db.productos.deleteMany({precio:{$lt:1000}})
use admin
db.createUser(
   {
    user: "pepe",
    pwd: "asd456",
    roles: [
        {role: "read", db: "ecommerce"}
    ]
   }
  )





