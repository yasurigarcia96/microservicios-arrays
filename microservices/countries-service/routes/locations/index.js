// Importamos la biblioteca Express
const express = require("express");


// Importamos el archivo data-library.js que contiene la información sobre los países.
const data = require("../../data/data-library");
const axios = require("axios");  
// Creamos un router de Express
const router = express.Router();


// Creamos una función de registro que imprime mensajes de registro en la consola
const logger = (message) => console.log(`Countries Service: ${message}`);


const rutaautores = "http://authors:3000/api/v2/authors";
const rutalibros = "http://books:4000/api/v2/books";


const arreglosdepaises = Object.values(data.dataLibrary.countries);


// Creamos una ruta GET en la raíz del router que devuelve todos los países
router.get("/", (req, res) => {


  // Creamos un objeto de respuesta con información sobre el servicio y los datos de los países
  const response = {
    service: "countries",
    architecture: "microservices",
    length: data.dataLibrary.countries.length,
    data: data.dataLibrary.countries,
  };
  // Registramos un mensaje en la consola
  logger("Get countries data");
  // Enviamos la respuesta al cliente
  return res.send(response);
});

//00000000000000000000000000000000000000000000000000000000000000000000000000000

router.get("/detallepais/:capital", async (req, res) => {
  const capital = req.params.capital;
  const pais = arreglosdepaises.find(pais=> {
    return pais.capital === capital;
  })

  let listaautores;
  let listalibros;

  try {
    const autores = await axios.get(`${rutaautores}/pais/${pais.name}`);
    listaautores = autores.data;
    const libros = await axios.get(`${rutalibros}/distribucion/${pais.name}`);
    listalibros = libros.data;
  } catch (error) {
    console.log(error);
    return res.status(500).send("holi");
  }

  const response = {
    service: "countries",
    architecture: "microservices",
    data: {
      country: pais.name,
      authors: listaautores,
      books: listalibros,
    },
  };
  
  return res.send(response);
});


// Exportamos el router
module.exports = router;







