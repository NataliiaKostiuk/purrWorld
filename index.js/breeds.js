

const apiKey = 'live_7aU1ucXbT2AtrrxSveghwyabcqoIkIWOcggbm3JdkgSkkfWThJcg2HDSTJql2Xij';
const apiUrl = 'https://api.thecatapi.com/v1/breeds';

let breeds = []; 
let displayedBreeds = [];
const limit = 8;
let page = 1;
let isSearching = false; 

const container = document.querySelector('.js-container');
const btnLoadMore = document.querySelector('.js-btn');
const input = document.querySelector('.js-input');

async function getCatBreeds() {
    try {
        const response = await fetch(apiUrl, {
            headers: { 'x-api-key': apiKey }
        });

        if (!response.ok) {
            throw new Error(response.statusText || 'Error');
        }
        breeds = await response.json(); 
        resetBreeds(breeds); 
    } catch (error) {
        console.log(error);
    }
}


function renderBreeds(data) {
    container.innerHTML = createMarkUp(data);
    if (isSearching || displayedBreeds.length >= breeds.length) {
        btnLoadMore.style.display = 'none';
    } else {
        btnLoadMore.style.display = 'block';
    }
}

function createMarkUp(data) {
    return data.map(({ description, name, temperament, origin, life_span, image }) => {
        const imageUrl = image?.url || './images/image.jpg';

        return `<li class="breed-item">
            <img class="breed-img" src="${imageUrl}" alt="${name}" />
            <div>
                <h2 class="title-text">${name}</h2>
                <p class="descr-point"><span class="title-subtext">Country of origin:</span> ${origin}</p>
                <p class="descr-point"><span class="title-subtext">Life expectancy:</span> ${life_span}</p>
                <p class="descr-point"><span class="title-subtext">Temperament:</span> ${temperament}</p>
                <p class="descr-point"><span class="title-subtext">Description:</span> ${description}</p>
            </div>
        </li>`;
    }).join('');
}

function resetBreeds() {
    page = 1;
    displayedBreeds = breeds.slice(0, limit);
    isSearching = false; 
    renderBreeds(displayedBreeds);
}

btnLoadMore.addEventListener('click', () => {
    if (isSearching) return; 

    const nextBreeds = breeds.slice(page * limit, (page + 1) * limit);
    displayedBreeds = [...displayedBreeds, ...nextBreeds];
    page++;
    renderBreeds(displayedBreeds);
});


input.addEventListener('input', () => {
    const searchValue = input.value.toLowerCase().trim();

    if (searchValue === '') {
        resetBreeds(); 
    } else {
        isSearching = true;
        displayedBreeds = breeds.filter(({ name }) =>
            name.toLowerCase().includes(searchValue)
        );
        renderBreeds(displayedBreeds);
    }
});

getCatBreeds(); 