let map, directionsService, directionsRenderer, startAutocomplete, endAutocomplete;
function adjustContentPosition() {
    let header = document.querySelector(".headerBar");
    let searchBars = document.querySelector(".searchBars");
    let map = document.querySelector("#map");

    if (header) {
        let headerHeight = header.offsetHeight;

        // Push search bars down
        if (searchBars) searchBars.style.marginTop = `${headerHeight + 50}px`; // 50px margin below header

        // Push map further down
        if (map) map.style.marginTop = `${headerHeight}px`; // Adjust spacing as needed
    }
}

// Run on page load and window resize
window.addEventListener("load", adjustContentPosition);
window.addEventListener("resize", adjustContentPosition);
function initMap() {
    const campusCenter = { lat: 40.809008176956404, lng: -73.96384528956837 };

    const buildings = [
        { "name": "Northwest Corner Science Building", "lat": 40.810126869634149, "lng": -73.96194424631715, "accessible": true },
        { "name": "Pupin Hall", "lat": 40.81006, "lng": -73.96135, "accessible": true },
        { "name": "Schapiro Center for Engineering and Physical Science Research (CEPSR)", "lat": 40.809743982099086, "lng": -73.96070978467252, "accessible": true },
        { "name": "Mudd Building", "lat": 40.809423710181996, "lng": -73.95992575511308, "accessible": true },
        { "name": "Fairchild Hall", "lat": 40.809092000302314, "lng": -73.96037654776806, "accessible": true },
        { "name": "Chandler Hall", "lat": 40.80970261380818, "lng": -73.96229617878228, "accessible": true },
        { "name": "Havemeyer Hall", "lat": 40.80928675849477, "lng": -73.9622363600552, "accessible": true },
        { "name": "Uris Hall", "lat": 40.80904937459882, "lng": -73.96122323066608, "accessible": true },
        { "name": "Schermerhorn Hall", "lat": 40.80863245499121, "lng": -73.96055694648999, "accessible": true },
        { "name": "Mathematics Building", "lat": 40.809144216757176, "lng": -73.96275279962288, "accessible": true },
        { "name": "Earl Hall", "lat": 40.808605002177984, "lng": -73.96272990207427, "accessible": true },
        { "name": "Low Library", "lat": 40.80814979618504, "lng": -73.96184018469955, "accessible": true },
        { "name": "Avery Hall", "lat": 40.80826167301913, "lng": -73.96093536057215, "accessible": true },
        { "name": "Fayerweather Hall", "lat": 40.80808365318322, "lng": -73.96047062181182, "accessible": true },
        { "name": "St. Paul's Chapel", "lat": 40.80785212660102, "lng": -73.96094593513132, "accessible": true },
        { "name": "Buell Hall", "lat": 40.80771565086098, "lng": -73.96142824495205, "accessible": true },
        { "name": "Philosophy Hall", "lat": 40.807492699322715, "lng": -73.96091531279053, "accessible": true },
        { "name": "Kent Hall", "lat": 40.80721902538474, "lng": -73.96140918967866, "accessible": true },
        { "name": "Dodge Hall", "lat": 40.807979236225165, "lng": -73.96320032069582, "accessible": true },
        { "name": "Dodge Physical Fitness Center", "lat": 40.80944086886444, "lng": -73.96178898361195, "accessible": true },
        { "name": "Lewisohn Hall", "lat": 40.80838973022477, "lng": -73.96318885581596, "accessible": true },
        { "name": "Pulitzer (Journalism) Hall", "lat": 40.807615231190944, "lng": -73.96355398932648, "accessible": true },
        { "name": "Furnald Hall", "lat": 40.807450560468766, "lng": -73.96400143429656, "accessible": true },
        { "name": "Hamilton Hall", "lat": 40.8068162248793, "lng": -73.96166535781718, "accessible": true },
        { "name": "Hartley Hall", "lat": 40.80645132291364, "lng": -73.96166195999324, "accessible": true },
        { "name": "Wallach Hall", "lat": 40.8060131583178, "lng": -73.96187667362537, "accessible": true },
        { "name": "Alfred Lerner Hall", "lat": 40.806856929097954, "lng": -73.9640194216417, "accessible": true },
        { "name": "Carmen Hall", "lat": 40.806576930225866, "lng": -73.96423227193723, "accessible": true },
        { "name": "John Jay Hall", "lat": 40.80585231334633, "lng": -73.96236717239124, "accessible": true },
        { "name": "Butler Library", "lat": 40.806358371702046, "lng": -73.96319231812728, "accessible": true },
    ];

    const dining_spots = [
        { "name": "Ferris Booth Commons", "lat": 40.806874463985686, "lng": -73.96398857377814, "accessible": true },
        { "name": "JJ's", "lat": 40.80585424592349, "lng": -73.96236550336536, "accessible": true },
        { "name": "John Jay", "lat": 40.80583626086086, "lng": -73.96239160167686, "accessible": true },
        { "name": "Chef Mike's Sub Shop", "lat": 40.80881417060185, "lng": -73.96134719046744, "accessible": true },
        { "name": "Johnny's", "lat": 40.80602438304332, "lng": -73.96275370239007, "accessible": true },
        { "name": "Chef Don's Pizza Pi", "lat": 40.80939329743825, "lng": -73.95986635365031, "accessible": true },
        { "name": "Blue Java Café - Uris", "lat": 40.809062524331296, "lng": -73.96122147513671, "accessible": true },
        { "name": "Blue Java Café - Butler", "lat": 40.806364439096086, "lng": -73.9631910367232, "accessible": true },
        { "name": "Blue Java Café - Mudd", "lat": 40.80941902236416, "lng": -73.95992275794005, "accessible": true }
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
        wheelchairAccessible: true
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
