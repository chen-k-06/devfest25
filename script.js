let map, directionsService, directionsRenderer;

function initMap() {
    // Center the map on 116th St & Broadway, NYC
    const columbiaLocation = { lat: 40.8075, lng: -73.9626 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: columbiaLocation,
        zoom: 14,
    });

    // Initialize Directions Service & Renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Autocomplete for location inputs
    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");

    new google.maps.places.Autocomplete(startInput);
    new google.maps.places.Autocomplete(endInput);
}

function calculateRoute() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

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
