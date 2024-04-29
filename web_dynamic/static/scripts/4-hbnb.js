// Una página dinámica con JQuery.

/**
 * Realiza una solicitud AJAX para buscar lugares y renderizar la información recibida en la interfaz de usuario.
 * @param {Object} body - El cuerpo de la solicitud que contiene los parámetros de búsqueda de lugares (opcional).
 */
function renderPlaces(body = {}) {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(body),
    dataType: 'json',
    success: function (response) {
      let placesHTML = '';
      response.forEach((place) => {
        placesHTML += `
        <article>
        <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
        <div class="max_guest">
        ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
        </div>
        <div class="number_rooms">
        ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
        </div>
        <div class="number_bathrooms">
        ${place.number_bathrooms} Bathroom${
          place.number_bathrooms !== 1 ? 's' : ''
        }
        </div>
          </div>
          <div class="description">${place.description}</div>
        </article>
        `;
      });
      $('section.places').html(placesHTML);
    },
    error: function (_, status, error) {
      console.error('Houston tenemos un problema', status, error);
    },
  });
}

/**
 * Obtiene los nombres y IDs de las amenidades seleccionadas en casillas de verificación en el DOM.
 * @returns {Object} - Un objeto que contiene dos arreglos: aminitiesNames (nombres de las amenidades seleccionadas)
 *                      y amenitiesIds (IDs de las amenidades seleccionadas).
 */
function inputBoxChecked() {
  const amenitiesCollection = $('input[type="checkbox"]');
  const aminitiesNames = [];
  const amenitiesIds = [];
  amenitiesCollection.each(function (_, element) {
    if (element.checked) {
      aminitiesNames.push(element.dataset.name);
      amenitiesIds.push(element.dataset.id);
    }
  });
  const data = {
    aminitiesNames,
    amenitiesIds,
  };
  return data;
}

/**
 * Verifica la disponibilidad del servicio de la API consultando su estado mediante una solicitud AJAX.
 * Actualiza la clase de un elemento HTML para reflejar la disponibilidad del servicio.
 */
function available() {
  $(document).ready(function () {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/status',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        }
      },
      error: function (_, status, error) {
        console.error('Error en la solictud:', status, error);
      },
    });
  });
}

/**
 * Actualiza el texto de un elemento h4 con los nombres de las amenidades seleccionadas
 * cada vez que se cambia una casilla de verificación.
 */
function addAminitiesToH4() {
  $('.amenities input[type="checkbox"]').on('change', function () {
    const data = inputBoxChecked();
    $('.amenities h4').text(data.aminitiesNames.join(','));
  });
}

/**
 * Filtra los lugares según las amenidades seleccionadas al
 * hacer clic en un botón y renderiza los resultados.
 */
function filterPlacesForAminities() {
  $('button').on('click', function () {
    const data = inputBoxChecked();
    const amenitiesIds = data.amenitiesIds;
    const body = {
      places: '',
      amenities: amenitiesIds,
    };
    renderPlaces(body);
  });
}

function main() {
  addAminitiesToH4();
  renderPlaces();
  available();
  filterPlacesForAminities();
}

$(document).ready(function () {
  main();
});
