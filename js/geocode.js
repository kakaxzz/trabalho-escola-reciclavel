async function geocodePlace(place) {
    if (place.lat && place.lng) return;

    state.loadingIds.push(place.id);
    renderPlacesList();

    try {
        const cacheKey = `geo:${place.address}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            const { lat, lng } = JSON.parse(cached);
            updatePlaceCoordinates(place.id, lat, lng);
            return;
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place.address)}&limit=1&addressdetails=0`;
        const response = await fetch(url, {
            headers: { 'Accept-Language': 'pt-BR,pt;q=0.9' }
        });

        const data = await response.json();

        if (data && data[0]) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);

            localStorage.setItem(cacheKey, JSON.stringify({ lat, lng }));
            updatePlaceCoordinates(place.id, lat, lng);
        }
    } catch (error) {
        console.error('Geocoding error:', error);
    } finally {
        state.loadingIds = state.loadingIds.filter(id => id !== place.id);
        renderPlacesList();
    }
}
