const names = 'nmnmmn'
console.log(names);
const apiKey = 'live_7aU1ucXbT2AtrrxSveghwyabcqoIkIWOcggbm3JdkgSkkfWThJcg2HDSTJql2Xij';
const apiUrl = 'https://api.thecatapi.com/v1/breeds';
console.log(apiKey);
const getCatBreeds = async () => {
    try {
        const response = await fetch(apiUrl, {
            headers: { 'x-api-key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const breeds = await response.json();
        console.log(breeds);
        displayBreeds(breeds); // Call function to display breeds
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }
};

// Function to display breeds in a list
const displayBreeds = (breeds) => {
    const breedList = document.getElementsByClassName('.js-container');
    breedList.innerHTML = ''; // Clear previous list

    breeds.forEach(breed => {
        const listItem = document.createElement('li');
        listItem.textContent = breed.name;
        breedList.appendChild(listItem);
    });
};

// Function to fetch images of a specific breed
const getBreedImages = async (breedId) => {
    const imageUrl = `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${breedId}&api_key=${apiKey}`;

    try {
        const response = await fetch(imageUrl);
        const images = await response.json();
        displayBreedImages(images);
    } catch (error) {
        console.error('Error fetching breed images:', error);
    }
};

// Function to display breed images
const displayBreedImages = (images) => {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Clear previous images

    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = 'Cat Image';
        imgElement.style.width = '200px';
        imgElement.style.margin = '10px';
        imageContainer.appendChild(imgElement);
    });
};

// Load breeds when the page is ready
document.addEventListener('DOMContentLoaded', getCatBreeds);
