// Actualiza el contenido dentro del h4 en Amenities,
//con los aminities seleccionados

// Método #1
// $(document).ready(function(){
//     // Initialize an empty object to store Amenity IDs
//     var amenities = {};

//     // Function to update the h4 tag inside the div Amenities
//     function updateAmenities() {
//         var amenitiesList = Object.keys(amenities).map(function(key) {
//             return $('[data-id="' + key + '"]').data('name');
//         }).join(', '); // Convert object keys to amenity names
//         $('div.amenities > h4').text(amenitiesList);
//     }

//     // Listen for changes on each input checkbox tag
//     $('input[type="checkbox"]').change(function() {
//         var amenityId = $(this).data('id'); // Get Amenity ID from data-id attribute

//         if ($(this).is(':checked')) {
//             amenities[amenityId] = true; // Store Amenity ID in the variable
//         } else {
//             delete amenities[amenityId]; // Remove Amenity ID from the variable
//         }

//         updateAmenities(); // Update the h4 tag inside the div Amenities
//     });
// });

// Método #2
// $(document).ready(function () {
//     function updateAmenities() {
//       var amenitiesChecked = $('.amenities input[type="checkbox"]:checked').map(function() {
//         return $(this).data('name');
//       }).get().join(',');
//       $('.amenities h4').text(amenitiesChecked);
//     }

//     $('.amenities input[type="checkbox"]').on("change", updateAmenities);
//   });

// Método #3
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
