const express = require('express'); // Importar Express
const { Client } = require('@notionhq/client'); // Importar cliente de Notion
const cors = require('cors'); // Middleware para manejar CORS

// Configurar cliente de Notion con tu token de integración interno
const notion = new Client({ auth: 'ntn_T5286936861qNCZgVLaCFWnBforNAlWkuzrvaTsiSF66Pg' }); // Reemplaza con tu token

// Inicializar Express
const app = express();
app.use(cors()); // Permitir solicitudes desde otros orígenes

// ID de tu base de datos de Notion
const databaseId = '17513b20411d801daab0c4ef82d0e9b3'; // Reemplaza con tu Database ID

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente. Usa la ruta /api/data para obtener los datos.');
});

// Ruta para obtener datos de Notion
app.get('/api/data', async (req, res) => {
  try {
    console.log('Consultando la base de datos de Notion...');
    const response = await notion.databases.query({ database_id: databaseId });

    const data = response.results.map((item) => ({
      id: item.id,
      estado: item.properties["ESTADO"]?.title?.[0]?.text?.content || 'Sin estado', // Ajusta según las propiedades
    }));

    res.json(data); // Responder con los datos obtenidos
  } catch (error) {
    console.error('Error al obtener datos:', error.message);
    res.status(500).send('Error al consultar la base de datos');
  }
});

// Iniciar el servidor en el puerto 3000 (usado localmente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
