function loadPlaces() {
    const userPlaces = JSON.parse(localStorage.getItem('user:places') || '[]');
    state.places = [...userPlaces, ...SEED_PLACES];
    filterPlaces();
    renderPlacesList();
    addMarkersToMap();
}

function filterPlaces() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categorySelect = document.getElementById('category-select').value;

    state.filteredPlaces = state.places.filter(place => {
        const matchesSearch =
            place.name.toLowerCase().includes(searchInput) ||
            place.address.toLowerCase().includes(searchInput);

        const matchesCategory =
            categorySelect === 'Todos' ||
            place.category === categorySelect;

        return matchesSearch && matchesCategory;
    });
}

function renderPlacesList() {
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = '';

    if (state.filteredPlaces.length === 0) {
        placesList.innerHTML = '<div class="text-sm text-gray-500 p-3 text-center">Nenhum ponto encontrado para esse filtro.</div>';
        return;
    }

    state.filteredPlaces.forEach(place => {
        const placeElement = document.createElement('button');
        placeElement.className = `w-full text-left rounded-2xl p-3 border border-gray-200 hover:shadow-md transition-all ${
            state.activePlace?.id === place.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
        }`;
        placeElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <div class="font-semibold text-gray-800">${place.name}</div>
                    <div class="text-sm text-gray-600 mt-1">${place.address}</div>
                    ${place.hours ? `<div class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${place.hours}
                    </div>` : ''}
                </div>
                <span class="text-xs font-medium rounded-full px-2 py-1 ${
                    place.category === 'PEV' ? 'bg-green-100 text-green-800' :
                    place.category === 'Shopping' ? 'bg-purple-100 text-purple-800' :
                    place.category === 'Instituição' ? 'bg-blue-100 text-blue-800' :
                    place.category === 'Sesc' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                }">${place.category}</span>
            </div>
            ${place.infoUrl ? `<a href="${place.infoUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block">
                Mais informações ↗
            </a>` : ''}
            ${state.loadingIds.includes(place.id) ? `<div class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <svg class="animate-spin h-3 w-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Localizando no mapa…
            </div>` : ''}
        `;

        placeElement.addEventListener('click', () => {
            setActivePlace(place);
        });

        placesList.appendChild(placeElement);
    });
}

function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', () => {
        filterPlaces();
        renderPlacesList();
        addMarkersToMap();
    });

    document.getElementById('category-select').addEventListener('change', () => {
        filterPlaces();
        renderPlacesList();
        addMarkersToMap();
    });

    document.getElementById('toggle-add-form').addEventListener('click', () => {
        const form = document.getElementById('add-point-form');
        const button = document.getElementById('toggle-add-form');

        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden');
            form.classList.add('grid');
            button.innerHTML = `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
                Fechar
            `;
        } else {
            form.classList.add('hidden');
            form.classList.remove('grid');
            button.innerHTML = `
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Adicionar novo ponto (endereço)
            `;
        }
    });

    document.getElementById('add-point-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('point-name').value;
        const address = document.getElementById('point-address').value;
        const category = document.getElementById('point-category').value;

        if (!name || !address) return;

        const newPlace = {
            id: `user-${Date.now()}`,
            name,
            category,
            address,
            lat: null,
            lng: null
        };

        const userPlaces = JSON.parse(localStorage.getItem('user:places') || '[]');
        userPlaces.unshift(newPlace);
        localStorage.setItem('user:places', JSON.stringify(userPlaces));

        state.places.unshift(newPlace);
        filterPlaces();
        renderPlacesList();
        addMarkersToMap();

        document.getElementById('point-name').value = '';
        document.getElementById('point-address').value = '';
        document.getElementById('point-category').value = 'Outro';

        form.classList.add('hidden');
        form.classList.remove('grid');
        button.innerHTML = `
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Adicionar novo ponto (endereço)
        `;

        geocodePlace(newPlace);
    });
}
