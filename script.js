let map, directionsService, directionsRenderer, startAutocomplete, endAutocomplete;

function initMap() {
    const campusCenter = { lat: 40.809008176956404, lng: -73.96384528956837 };

    const buildings = [
        { "name": "Northwest Corner Science Building", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Pupin Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Schapiro Center for Engineering and Physical Science Research (CEPSR)", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Mudd Building", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Fairchild Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Chandler Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Havemeyer Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Uris Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Schermerhorn Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Mathematics Building", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Earl Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Low Library", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Avery Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Fayerweather Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "St. Paul's Chapel", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Buell Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Philosophy Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Kent Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Dodge Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Dodge Physical Fitness Center", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Lewisohn Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Pulitzer (Journalism) Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Furnald Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Hamilton Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Hartley Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Wallach Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Alfred Lerner Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Carmen Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "John Jay Hall", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Butler Library", "lat": 0, "lng": 0, "accessible": true },
    ];

    const dining_spots = [
        { "name": "Ferris Booth Commons", "lat": 0, "lng": 0, "accessible": true },
        { "name": "JJ's", "lat": 0, "lng": 0, "accessible": true },
        { "name": "John Jay", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Chef Mike's Sub Shop", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Johnny's", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Chef Don's Pizza Pi", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Blue Java Café - Uris", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Blue Java Café - Butler", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Blue Java Café - Mudd", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Joe's Coffee - Northwest Corner", "lat": 0, "lng": 0, "accessible": true },
        { "name": "Joe's Coffee - Furnald", "lat": 0, "lng": 0, "accessible": true }
    ];

    // Initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: campusCenter,
    });

    buildings.forEach(building => createMarker(building, map));

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

function createMarker(building, map) {
    const markerColor = building.accessible ? "green" : "red";
    const marker = new google.maps.Marker({
        position: { lat: building.lat, lng: building.lng },
        map: map,
        title: building.name,
        icon: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`,
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${building.name}</strong><br>${building.accessible ? "Wheelchair Accessible" : "Not Accessible"}`,
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
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
