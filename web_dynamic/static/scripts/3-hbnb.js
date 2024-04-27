// Actualiza el contenido dentro del h4 en Amenities,
//con los aminities seleccionados

$(document).ready(function () {
  /**
   * Obtiene una lista de las amenidades seleccionadas en checkboxes y las devuelve como una cadena.
   * @returns {string} Una cadena que contiene los nombres de las amenidades seleccionadas, separadas por comas.
   */
  function inputBoxChecked() {
    const amenitiesCollection = $('input[type="checkbox"]');
    const amenitiesChecked = [];
    amenitiesCollection.each(function (_, element) {
      if (element.checked) {
        amenitiesChecked.push(element.dataset.name);
      }
    });
    return amenitiesChecked.join(',');
  }
  // Se lanza evento cada vez que el checkbox cambia
  $('.amenities input[type="checkbox"]').on('change', function () {
    $('.amenities h4').text(inputBoxChecked());
  });
});

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

$(document).ready(function () {
  const body = {};
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
              ${place.number_rooms} Bedroom${
          place.number_rooms !== 1 ? 's' : ''
        }
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
});
