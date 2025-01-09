// URL de tu backend
const API_URL = 'http://localhost:3000/api/data';

// Elemento contenedor donde se mostrarán los datos
const dataContainer = document.getElementById('data-container');

// Función para obtener y mostrar los datos de Notion
async function fetchData() {
  try {
    // Hacer una solicitud a la API
    const response = await fetch(API_URL);
    const data = await response.json();

    // Verificar si hay datos
    if (data.length === 0) {
      dataContainer.innerHTML = '<p>No se encontraron datos.</p>';
      return;
    }

    // Iterar sobre los datos y agregarlos al contenedor
    data.forEach((item) => {
      const dataItem = document.createElement('div');
      dataItem.className = 'data-item';
      dataItem.innerHTML = `
        <p><strong>ID:</strong> ${item.id}</p>
        <p><strong>Estado:</strong> ${item.estado}</p>
      `;
      dataContainer.appendChild(dataItem);
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    dataContainer.innerHTML = '<p>Error al obtener los datos. Por favor, intenta nuevamente.</p>';
  }
}

// Llamar a la función para obtener y mostrar los datos
fetchData();