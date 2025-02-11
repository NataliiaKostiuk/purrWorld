
const apiKey = 'live_7aU1ucXbT2AtrrxSveghwyabcqoIkIWOcggbm3JdkgSkkfWThJcg2HDSTJql2Xij';
const apiUrl = 'https://api.thecatapi.com/v1/breeds';
const limit = 9;
let page = 1;

const container = document.querySelector('.js-container')
const btnLoadMore = document.querySelector('.js-btn');
const input = document.querySelector('.js-input')
console.log(input.currentTarget);

async function getCatBreeds() {
    try {
        const response = await fetch(`${apiUrl}?limit=${limit}&page=${page}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText || 'Error')
        }
        const breeds = await response.json();
        console.log(breeds);
    container.insertAdjacentHTML("beforeend", createMarkUp(breeds))
            if (breeds.length < limit) {
            btnLoadMore.style.display = 'none';
        }
        
    } catch (error) {
       console.log(error); 
    }
}
function createMarkUp(date) {
    return date.map(({ description, name, temperament, origin, life_span, image }) => {
        const imageId = image?.id || 'default';
        const imageUrl = image?.url || './images/image.jpg';
        return `<li class="breed-item" data-id="${imageId}">
            <img class="breed-img" src="${imageUrl}" alt="${name}" />
            <div>
                <h2 class= "title-text"> ${name}</h2>
                <p class="descr-point"><span class="title-subtext">Country of origin:</span> ${origin}</p>
                <p class="descr-point"><span class="title-subtext">Life expectancy:</span> ${life_span}</p>
                <p class="descr-point"><span class="title-subtext">Temperament:</span> ${temperament}</p>
                <p class="descr-point"><span class="title-subtext">Description:</span> ${description}</p>
            </div>
        </li>`;
    }).join('');
}
getCatBreeds();

btnLoadMore.addEventListener('click', () => {
    page++; 
    getCatBreeds(); 
});


input.addEventListener('input', searchCard)

function searchCard() {
    searchValue = input.value
    console.log(searchValue);
}
