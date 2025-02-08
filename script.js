let map, directionsService, directionsRenderer;

// EDIT BUILDINGS
const buildings = [
    { name: "Library", lat: 40.7128, lng: -74.0060, accessible: true },
    { name: "Science Hall", lat: 40.7130, lng: -74.0075, accessible: false }
  ];

function initMap() {
    const campusCenter = { lat: 40.809008176956404, lng: -73.96384528956837 };
    // Initialize map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: campusCenter,
    });

    // Add markers
    buildings.forEach(building => {
      const markerColor = building.accessible ? "green" : "red";

      const marker = new google.maps.Marker({
        position: { lat: building.lat, lng: building.lng },
        map: map,
        title: building.name,
        icon: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`
      });

      const infowindow = new google.maps.InfoWindow({
        content: `<strong>${building.name}</strong><br>${building.accessible ? "Accessible" : "Not Accessible"}`
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    });
  }

function calculateRoute() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    if (!start || !end) {
        alert("Please enter both start and destination locations.");
        return;
    }

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            // Display walking time
            const walkingTime = result.routes[0].legs[0].duration.text;
            alert(`Estimated Walking Time: ${walkingTime}`);
        } else {
            alert("Could not retrieve directions. Please check your inputs.");
        }
    });
}
