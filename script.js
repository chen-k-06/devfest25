let map, directionsService, directionsRenderer, startAutocomplete, endAutocomplete;
function adjustContentPosition() {
    let header = document.getElementById('header');
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

    // DO STUFF HERE!!!!!!!
    const accessibleRoutes = [
        { start: { lat: 40.8065385, lng: -73.9637180 }, end: { lat: 40.8074630, lng: -73.9629968 } }, // Accessible route 1
    ];

    const buildings = [
        { "name": "Northwest Corner Science Building", "lat": 40.810126869634149, "lng": -73.96194424631715, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Pupin Hall", "lat": 40.81006, "lng": -73.96135, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Schapiro Center for Engineering and Physical Science Research (CEPSR)", "lat": 40.809743982099086, "lng": -73.96070978467252, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Mudd Building", "lat": 40.809423710181996, "lng": -73.95992575511308, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Fairchild Hall", "lat": 40.809092000302314, "lng": -73.96037654776806, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Chandler Hall", "lat": 40.80970261380818, "lng": -73.96229617878228, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Havemeyer Hall", "lat": 40.80928675849477, "lng": -73.9622363600552, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Uris Hall", "lat": 40.80904937459882, "lng": -73.96122323066608, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Schermerhorn Hall", "lat": 40.80863245499121, "lng": -73.96055694648999, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Mathematics Building", "lat": 40.809144216757176, "lng": -73.96275279962288, "accessibleCampusEntrance": false, "accessibleBuildingEntrance": false, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Earl Hall", "lat": 40.808605002177984, "lng": -73.96272990207427, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Low Library", "lat": 40.80814979618504, "lng": -73.96184018469955, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Avery Hall", "lat": 40.80826167301913, "lng": -73.96093536057215, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Fayerweather Hall", "lat": 40.80808365318322, "lng": -73.96047062181182, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "St. Paul's Chapel", "lat": 40.80785212660102, "lng": -73.96094593513132, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Buell Hall", "lat": 40.80771565086098, "lng": -73.96142824495205, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Philosophy Hall", "lat": 40.807492699322715, "lng": -73.96091531279053, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Kent Hall", "lat": 40.80721902538474, "lng": -73.96140918967866, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Dodge Hall", "lat": 40.807979236225165, "lng": -73.96320032069582, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Dodge Physical Fitness Center", "lat": 40.80944086886444, "lng": -73.96178898361195, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Lewisohn Hall", "lat": 40.80838973022477, "lng": -73.96318885581596, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Pulitzer (Journalism) Hall", "lat": 40.807615231190944, "lng": -73.96355398932648, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Furnald Hall", "lat": 40.807450560468766, "lng": -73.96400143429656, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Hamilton Hall", "lat": 40.8068162248793, "lng": -73.96166535781718, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Hartley Hall", "lat": 40.80645132291364, "lng": -73.96166195999324, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Wallach Hall", "lat": 40.8060131583178, "lng": -73.96187667362537, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Alfred Lerner Hall", "lat": 40.806856929097954, "lng": -73.9640194216417, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Carmen Hall", "lat": 40.806576930225866, "lng": -73.96423227193723, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "John Jay Hall", "lat": 40.80585231334633, "lng": -73.96236717239124, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Butler Library", "lat": 40.806358371702046, "lng": -73.96319231812728, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false }
    ];

    const dining_spots = [
        { "name": "Ferris Booth Commons", "lat": 40.806874463985686, "lng": -73.96398857377814, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "JJ's", "lat": 40.80585424592349, "lng": -73.96236550336536, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "John Jay", "lat": 40.80583626086086, "lng": -73.96239160167686, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Chef Mike's Sub Shop", "lat": 40.80881417060185, "lng": -73.96134719046744, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Johnny's", "lat": 40.80602438304332, "lng": -73.96275370239007, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Chef Don's Pizza Pi", "lat": 40.80939329743825, "lng": -73.95986635365031, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Blue Java Café - Uris", "lat": 40.809062524331296, "lng": -73.96122147513671, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Blue Java Café - Butler", "lat": 40.806364439096086, "lng": -73.9631910367232, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
        { "name": "Blue Java Café - Mudd", "lat": 40.80941902236416, "lng": -73.95992275794005, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false }
    ];

    const campus_entrances = [{ "name": "116th & Broadway entrance", "lat": 40.80794393404023, "lng": -73.9637138727193, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
    { "name": "116th & Amsterdam entrance", "lat": 40.80687583997451, "lng": -73.96117616184806, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
    { "name": "Northwest Corner entrance", "lat": 40.81028600452615, "lng": -73.96189101481595, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
    { "name": "Schapiro entrance", "lat": 40.80979726892658, "lng": -73.96074790408879, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
    { "name": "Computer Science entrance", "lat": 40.80933603350681, "lng": -73.95972463697046, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },
    { "name": "115th & Broadway entrance", "lat": 40.80724773603954, "lng": -73.96419603111585, "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false }
    ];

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


    // Initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: campusCenter,
    });

    buildings.forEach(building => createMarker(building, map));
    accessibleRoutes.forEach(route => {
        const accessiblePolyline = new google.maps.Polyline({
            path: [route.start, route.end],
            geodesic: true,
            strokeColor: '#0059b3', // Green color for accessible routes
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });

        accessiblePolyline.setMap(map);
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

function createMarker(building, map) {
    const markerColor = building.accessibleBuildingEntrance ? "green" : "red";

    // "accessibleCampusEntrance": true, "accessibleBuildingEntrance": true, "buildingElevator": false, "ramp": false, "accessibleBuildingAccessWithAuthorization": false, "restrictedAccessElevator": false, "wheelchairLift": false },

    const marker = new google.maps.Marker({
        position: { lat: building.lat, lng: building.lng },
        map: map,
        title: building.name,
        icon: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`,
    });

    const infowindow = new google.maps.InfoWindow({
        content: `
            <strong>${building.name}</strong><br>
            <ul>
                <li><strong>Accessible Campus Entrance:</strong> ${building.accessibleCampusEntrance ? "Yes" : "No"}</li>
                <li><strong>Accessible Building Entrance:</strong> ${building.accessibleBuildingEntrance ? "Yes" : "No"}</li>
                <li><strong>Building Elevator:</strong> ${building.buildingElevator ? "Yes" : "No"}</li>
                <li><strong>Ramp Available:</strong> ${building.ramp ? "Yes" : "No"}</li>
                <li><strong>Accessible Building Access (with Authorization):</strong> ${building.accessibleBuildingAccessWithAuthorization ? "Yes" : "No"}</li>
                <li><strong>Restricted Access Elevator:</strong> ${building.restrictedAccessElevator ? "Yes" : "No"}</li>
                <li><strong>Wheelchair Lift:</strong> ${building.wheelchairLift ? "Yes" : "No"}</li>
            </ul>
        `
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

// Helper function to calculate the distance between two LatLng points
function getDistance(latLng1, latLng2) {
    const R = 3958.8; // Earth radius in miles
    const lat1 = latLng1.lat();
    const lng1 = latLng1.lng();
    const lat2 = latLng2.lat();
    const lng2 = latLng2.lng();
    const dLat = degreesToRadians(lat2 - lat1);
    const dLng = degreesToRadians(lng2 - lng1);

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 5280; // Distance in feet
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Helper to calculate perpendicular distance from point to line segment
function pointToLineDistance(point, lineStart, lineEnd) {
    const A = point.lat() - lineStart.lat();
    const B = point.lng() - lineStart.lng();
    const C = lineEnd.lat() - lineStart.lat();
    const D = lineEnd.lng() - lineStart.lng();

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = dot / len_sq;

    if (param < 0) param = 0;
    else if (param > 1) param = 1;

    const nearestLat = lineStart.lat() + param * C;
    const nearestLng = lineStart.lng() + param * D;

    const nearestPoint = new google.maps.LatLng(nearestLat, nearestLng);

    return getDistance(point, nearestPoint);
}

// Accessible Routes Algorithm
function getAccessibleRoutes(startLocation, endLocation, accessibleRoutes) {
    const closeRoutes = [];

    accessibleRoutes.forEach(route => {
        const startToRouteDistance = pointToLineDistance(startLocation, route.start, route.end);
        const endToRouteDistance = pointToLineDistance(endLocation, route.start, route.end);

        // If both start and end points are within 30 meters (100 feet ≈ 30 meters)
        if (startToRouteDistance <= 30 && endToRouteDistance <= 30) {
            closeRoutes.push(route);
        }
    });

    return closeRoutes;
}

// Function to calculate the route
function calculateRoute() {
    const startPlace = startAutocomplete.getPlace();
    const endPlace = endAutocomplete.getPlace();

    if (!startPlace || !endPlace || !startPlace.geometry || !endPlace.geometry) {
        alert("Please select valid start and destination locations.");
        return;
    }

    const start = startPlace.geometry.location;
    const end = endPlace.geometry.location;

    // Get accessible routes within range of start and end points
    const accessibleRoutesInRange = getAccessibleRoutes(start, end, accessibleRoutes);

    // If there are no accessible routes within range, show an alert
    if (accessibleRoutesInRange.length === 0) {
        alert("There is no accessible route between these points.");
        return;
    }

    // Request for directions using the first accessible route found
    const request = {
        origin: accessibleRoutesInRange[0].start,
        destination: accessibleRoutesInRange[0].end,
        travelMode: google.maps.TravelMode.WALKING
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