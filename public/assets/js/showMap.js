document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    const mapContainer = document.getElementById("map-canvas");
    if (!mapContainer) return;

    const defaultLat = 52.500149;
    const defaultLng = -0.126240;

    const map = L.map('map-canvas').setView([defaultLat, defaultLng], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // ================= LANDMARK MARKERS ================= //
    const markersData = [
        { coords: [51.527610, -0.153710], popup: "London Zoo" },
        { coords: [51.496960, -0.144870], popup: "Bus Tour" },
        { coords: [51.500830, -0.122050], popup: "London Eye" },
        { coords: [51.526530, -0.083680], popup: "London Aquarium" },
        { coords: [51.482660, -0.005200], popup: "National Maritime Museum" }
    ];

    const bounds = L.latLngBounds();
    let openPopup = null;

    markersData.forEach(data => {
    const marker = L.marker(data.coords).addTo(map);

    // Popup offset: raise ~20px above marker
    const popup = L.popup({ offset: [0, -20] }).setContent(`<b>${data.popup}</b>`);

    marker.on('click', () => {
        if (openPopup) openPopup.remove();
        popup.setLatLng(data.coords).openOn(map);
        openPopup = popup;
    });

    bounds.extend(data.coords);
});

// Geolocation popup also raised
const userPopup = L.popup({ offset: [0, -20] }).setContent("You are here");


    // ================= GEOLOCATION ================= //
    const geoMsg = document.getElementById('nogeolocation');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = [position.coords.latitude, position.coords.longitude];
                const userMarker = L.marker(userCoords).addTo(map);
                const userPopup = L.popup().setContent("You are here");

                userMarker.on('click', () => {
                    if (openPopup) openPopup.remove();
                    userPopup.setLatLng(userCoords).openOn(map);
                    openPopup = userPopup;
                });

                userPopup.setLatLng(userCoords).openOn(map);
                openPopup = userPopup;

                bounds.extend(userCoords);
                map.fitBounds(bounds, { padding: [50, 50] });
            },
            () => {
                if (geoMsg) geoMsg.style.display = 'block';
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        );
    } else {
        if (geoMsg) geoMsg.style.display = 'block';
        map.fitBounds(bounds, { padding: [50, 50] });
    }
});