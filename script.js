let map, directionsService, directionsRenderer, startAutocomplete, endAutocomplete;

function initMap() {
    const campusCenter = { lat: 40.809008176956404, lng: -73.96384528956837 };

    const buildings = [
      { name: "Low Memorial Library", lat: 40.807722, lng: -73.962222, accessible: true },
      { name: "Butler Library", lat: 40.806503, lng: -73.961698, accessible: true },
      { name: "Alfred Lerner Hall", lat: 40.807535, lng: -73.964766, accessible: true },
      { name: "Pupin Hall", lat: 40.810376, lng: -73.960446, accessible: false },
      { name: "Schermerhorn Hall", lat: 40.809045, lng: -73.960683, accessible: true },
      { name: "Avery Hall", lat: 40.807759, lng: -73.961353, accessible: true },
      { name: "Hamilton Hall", lat: 40.807895, lng: -73.962555, accessible: true },
      { name: "John Jay Hall", lat: 40.806062, lng: -73.963764, accessible: true },
      { name: "Dodge Hall", lat: 40.807417, lng: -73.963089, accessible: false },
      { name: "Uris Hall", lat: 40.808691, lng: -73.961296, accessible: true },
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
