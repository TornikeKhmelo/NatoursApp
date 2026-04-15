/* eslint-disable */
function initTourMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement || !window.google || !window.google.maps) return;

  const locations = window.tourLocations || [];
  if (!locations.length) return;

  const firstLocation = locations[0];
  const map = new google.maps.Map(mapElement, {
    zoom: 8,
    center: {
      lat: firstLocation.coordinates[1],
      lng: firstLocation.coordinates[0],
    },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });

  const bounds = new google.maps.LatLngBounds();

  locations.forEach(loc => {
    const position = {
      lat: loc.coordinates[1],
      lng: loc.coordinates[0],
    };

    const marker = new google.maps.Marker({
      position,
      map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<p>Day ${loc.day}: ${loc.description}</p>`,
    });

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map,
      });
    });

    bounds.extend(position);
  });

  map.fitBounds(bounds, 80);
}

window.initTourMap = initTourMap;
