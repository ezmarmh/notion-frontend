const express = require('express'); // Importar Express
const { Client } = require('@notionhq/client'); // Importar cliente de Notion
const cors = require('cors'); // Middleware para habilitar CORS

// Configurar cliente de Notion con tu token de integración interno
const notion = new Client({ auth: 'ntn_T5286936861qNCZgVLaCFWnBforNAlWkuzrvaTsiSF66Pg' }); // Reemplaza con tu token válido

// Inicializar Express
const app = express();
app.use(cors()); // Permitir solicitudes desde otros orígenes

// ID de tu base de datos de Notion
const databaseId = '17513b20411d801daab0c4ef82d0e9b3'; // Reemplaza con el ID correcto de tu base de datos

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente. Usa la ruta /api/data para obtener los datos de la propiedad "Calculo de Meta".');
});

// Ruta para manejar las solicitudes de favicon (para evitar errores)
app.get('/favicon.ico', (req, res) => res.status(204));

// Ruta para obtener el valor de la propiedad "Calculo de Meta"
app.get('/api/data', async (req, res) => {
  try {
    console.log('Consultando la base de datos de Notion...');

    // Consultar la base de datos en Notion
    const response = await notion.databases.query({ database_id: databaseId });

    // Procesar los datos obtenidos
    const data = response.results.map((item) => ({
      id: item.id,
      calculoDeMeta: item.properties["Calculo de Meta"]?.number || 0, // Obtener el valor numérico o un valor predeterminado de 0
    }));

    console.log('Datos obtenidos:', data); // Mostrar datos en los logs
    res.json(data); // Responder con los datos obtenidos
  } catch (error) {
    console.error('Error al obtener datos de Notion:', error); // Mostrar el error en los logs
    res.status(500).send({
      message: 'Error al consultar la base de datos',
      error: error.message, // Enviar el mensaje del error al cliente
    });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Puerto dinámico para Vercel
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
