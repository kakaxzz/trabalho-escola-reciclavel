function initMap() {
    const center = [-22.9068, -43.1729];
    state.map = L.map('map').setView(center, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(state.map);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    });
}

function addMarkersToMap() {
    Object.values(state.markers).forEach(marker => {
        state.map.removeLayer(marker);
    });
    state.markers = {};

    state.filteredPlaces.forEach(place => {
        if (place.lat && place.lng) {
            const marker = L.marker([place.lat, place.lng]).addTo(state.map);

            marker.bindPopup(`
                <div class="space-y-1">
                    <div class="font-semibold text-gray-800">${place.name}</div>
                    <div class="text-sm text-gray-600">${place.address}</div>
                    ${place.hours ? `<div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${place.hours}
                    </div>` : ''}
                    ${place.infoUrl ? `<a href="${place.infoUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 hover:text-blue-800 underline mt-1 inline-block">
                        Detalhes ↗
                    </a>` : ''}
                </div>
            `);

            state.markers[place.id] = marker;

            marker.on('click', () => {
                setActivePlace(place);
            });
        }
    });
}

function setActivePlace(place) {
    state.activePlace = place;
    renderPlacesList();

    if (place.lat && place.lng) {
        state.map.flyTo([place.lat, place.lng], 14, { duration: 0.8 });
        if (state.markers[place.id]) {
            state.markers[place.id].openPopup();
        }
    }
}

function updatePlaceCoordinates(id, lat, lng) {
    const placeIndex = state.places.findIndex(p => p.id === id);
    if (placeIndex !== -1) {
        state.places[placeIndex].lat = lat;
        state.places[placeIndex].lng = lng;

        const filteredIndex = state.filteredPlaces.findIndex(p => p.id === id);
        if (filteredIndex !== -1) {
            state.filteredPlaces[filteredIndex].lat = lat;
            state.filteredPlaces[filteredIndex].lng = lng;
        }

        addMarkersToMap();

        if (state.activePlace?.id === id) {
            setActivePlace(state.places[placeIndex]);
        }
    }
}
