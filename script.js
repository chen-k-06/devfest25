let map, directionsService, directionsRenderer, startAutocomplete, endAutocomplete;

function initMap() {
    const campusCenter = { lat: 40.809008176956404, lng: -73.96384528956837 };

    // Initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: campusCenter,
    });

    // Initialize Directions Service and Renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Autocomplete for start and end locations
    startAutocomplete = new google.maps.places.Autocomplete(document.getElementById("searchBarStart"));
    endAutocomplete = new google.maps.places.Autocomplete(document.getElementById("searchBarEnd"));

    // Listen for place changes to trigger route calculation
    startAutocomplete.addListener("place_changed", calculateRoute);
    endAutocomplete.addListener("place_changed", calculateRoute);
}

function calculateRoute() {
    const startPlace = startAutocomplete.getPlace();
    const endPlace = endAutocomplete.getPlace();

    if (!startPlace || !endPlace) {
        alert("Please select both start and destination locations.");
        return;
    }

    const start = startPlace.geometry.location;
    const end = endPlace.geometry.location;

    // Directions request for walking
    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const walkingTime = result.routes[0].legs[0].duration.text;
            alert(`Estimated Walking Time: ${walkingTime}`);
        } else {
            alert("Could not retrieve directions. Please check your inputs.");
        }
    });
}
