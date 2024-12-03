// Inicializa el mapa
var map = L.map('map').setView([0, 0], 2);

// Vista inicial del mundo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crea un grupo de marcadores
var markerClusterGroup = new MarkerClusterGroup();

// Obtiene la ubicación del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Obtiene la latitud y longitud del usuario
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Centra el mapa en la ubicación del usuario
            map.setView([userLat, userLng], 13);

            // Obtiene los datos de las estaciones de carga desde el backend
            fetch('/stations')
                .then(response => response.json())
                .then(data => {
                    data.forEach(station => {
                        // Crea un marcador para cada estación de carga
                        var marker = L.marker([station.latitud, station.longitud]).bindPopup("<b>" + station.nombre + "</b><br/>" + station.direccion);

                        // Agrega el marcador al grupo de marcadores
                        markerClusterGroup.addLayer(marker);
                    });

                    // Agrega el grupo de marcadores al mapa
                    map.addLayer(markerClusterGroup);
                })
                .catch(error => console.error('Error fetching stations:', error));
        },
        (error) => {
            console.error('Error obtaining user location:', error);
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}