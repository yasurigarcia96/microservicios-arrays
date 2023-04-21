const express = require("express"); // importa Express
const router = express.Router(); // crea un nuevo enrutador de Express
const data = require("../../data/data-library"); // importa los datos de data-library

const logger = (message) => console.log(`Author Services: ${message}`);

// define un controlador para la ruta raíz ("/")
router.get("/", (req, res) => {
  const response = {
    // crea una respuesta con información sobre los libros
    service: "books",
    architecture: "microservices",
    length: data.dataLibrary.books.length,
    data: data.dataLibrary.books,
  };
  logger("Get book data"); // registra un mensaje en los registros
  return res.send(response); // devuelve la respuesta al cliente
});

// define un controlador para la ruta "/title/:title"
router.get("/title/:title", (req, res) => {
  // busca los libros que contengan el título buscado
  const titles = data.dataLibrary.books.filter((title) => {
    return title.title.includes(req.params.title);
  });
  // crea una respuesta con información sobre los libros que coinciden con el título buscado
  const response = {
    service: "books",
    architecture: "microservices",
    length: titles.length,
    data: titles,
  };
  return res.send(response); // devuelve la respuesta al cliente
});
//00000000000000000000000000000000000000000000000000000000000000000000000000000

//Listar los libros escritos por autor por nombre


//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// Listar los libros escritos por autor por id
router.get("/librosabuscarautorid/:id", (req, res) => {
  const books = data.dataLibrary.books.filter((book) => {
    return book.authorid == req.params.id;
  });
  const response = {
    service: "books",
    architecture: "microservices",
    length: books.length,
    data: books,
  };
  return res.send(response); // devuelve la respuesta al cliente
});

//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

//Punto 1 busca los libros que contengan el rango de años 
router.get("/librosabuscar/:menor/:mayor/", (req, res) => {
  const books = data.dataLibrary.books.filter((book) => {
    return book.year>= req.params.menor && book.year<= req.params.mayor;
  });
  const response = {
    service: "books",
    architecture: "microservices",
    length: books.length,
    data: books,
  };
  return res.send(response); // devuelve la respuesta al cliente
});

//00000000000000000000000000000000000000000000000000000000000000000000000000000

//Punto 2 buscar libros menor a 1900
router.get("/librosabuscardesde/:fecha/", (req, res) => {
  const books = data.dataLibrary.books.filter((book) => {
    return book.year>= req.params.fecha;
  });
  const response = {
    service: "books",
    architecture: "microservices",
    length: books.length,
    data: books,
  };
  return res.send(response); // devuelve la respuesta al cliente
});

///00000000000000000000000000000000000000000000000000000000000000000000000000000

//Punto 3 buscar libros mayor a 1900
router.get("/librosabuscarhasta/:fecha", (req, res) => {
  const books = data.dataLibrary.books.filter((book) => {
    return book.year<= req.params.fecha;
  });
  const response = {
    service: "books",
    architecture: "microservices",
    length: books.length,
    data: books,
  };
  return res.send(response); // devuelve la respuesta al cliente
});

//000000000000000000000000000000000000000000000000000000000000000000000000000000

//Punto 4 buscar libros igual 1900
router.get("/librosabuscarigual/:fecha", (req, res) => {
  const books = data.dataLibrary.books.filter((book) => {
    return book.year == req.params.fecha;
  });
  const response = {
    service: "books",
    architecture: "microservices",
    length: books.length,
    data: books,
  };
  return res.send(response); // devuelve la respuesta al cliente
});

module.exports = router; // exporta el enrutador de Express para su uso en otras partes de la aplicación

/*
Este código es un ejemplo de cómo crear una API de servicios utilizando Express y un enrutador. El enrutador define dos rutas: una para obtener todos los libros y otra para obtener libros por título. También utiliza una función simple de registro para registrar mensajes en los registros.
*/
