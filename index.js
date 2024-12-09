// Function to fetch data from an API
async function fetchAllBreeds() {
    try {
        playDogSound();
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        generateBreedsList(data["message"]); // Call the display function with the fetched data


    } catch (error) {
        console.error('Error fetching data:', error);
        displayError(error.message); // Display error message
    }
}


// Function to display an error message
function displayError() {
    const container = document.getElementById('dog-breeds-container');
    container.innerHTML = `<p style="color: red;">Error: </p>`;
}


// Function to generate a nested list
function generateBreedsList(data) {

    const container = document.getElementById('dog-breeds-container');
    for (let breed in data) {
        // Create a div for each breed
        const breedDiv = document.createElement('div');
        breedDiv.classList.add('breed');

        // Create an h4 for the breed name
        const breedName = document.createElement('h4');
        breedName.classList.add('breed-name');
        breedName.textContent = breed;
        breedDiv.appendChild(breedName);

        // Check for sub-breeds
        const subbreeds = data[breed];
        if (subbreeds.length > 0) {
            subbreeds.forEach(subbreed => {
                const subbreedElement = document.createElement('p');
                subbreedElement.classList.add('subbreed');
                subbreedElement.textContent = subbreed;
                breedDiv.appendChild(subbreedElement);
            });
        } else {
            const noSubbreeds = document.createElement('p');
            noSubbreeds.classList.add('subbreed');
            noSubbreeds.textContent = 'No subbreeds';
            breedDiv.appendChild(noSubbreeds);
        }

        // Append the breed div to the container
        container.appendChild(breedDiv);
    }
}


async function generateBreedGallery(breed) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '<p>Loading...</p>'; // Display a loading message

    try {
        // Fetch 10 random images for the specified breed
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/10`);
        const data = await response.json();

        // Check if the API returned images
        if (data.status === 'success' && Array.isArray(data.message)) {
            galleryContainer.innerHTML = ''; // Clear the loading message

            // Populate the gallery with images
            data.message.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = `${breed} image`;
                imgElement.className = 'gallery-item';

                galleryContainer.appendChild(imgElement);
            });
        } else {
            galleryContainer.innerHTML = `<p>Unable to load images for breed: ${breed}</p>`;
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        galleryContainer.innerHTML = `<p>Error loading images for breed: ${breed}</p>`;
    }
}

function handleBreedGallery() {
    const breedInput = document.getElementById('breed-input').value.trim().toLowerCase();

    if (breedInput) {
        generateBreedGallery(breedInput);
    } else {
        alert('Please enter a breed name.');
    }
}


async function getRandomDog() {
    const randomDogContainer = document.getElementById('random-dog-container');
    randomDogContainer.innerHTML = '<p>Loading...</p>'; // Display a loading message

    try {
        // Fetch a random dog image
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (data.status === 'success') {
            const imageUrl = data.message;

            // Extract the breed name from the image URL
            const breedMatch = imageUrl.match(/breeds\/([^/]+)/);
            const breedName = breedMatch ? breedMatch[1].replace('-', ' ') : 'Unknown Breed';

            // Display the image and breed name
            randomDogContainer.innerHTML = `
          <p class="random-dog-breed">${breedName}</p>
          <img src="${imageUrl}" alt="${breedName}" class="random-dog-image">
        `;
        } else {
            randomDogContainer.innerHTML = '<p>Failed to load a random dog. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error fetching random dog:', error);
        randomDogContainer.innerHTML = '<p>Error loading a random dog. Please try again.</p>';
    }
}

async function playDogSound() {

    // Create an audio element
    var audio = new Audio('dog-bark.mp3');
    console.log(audio);
    // Play the audio
    audio.play();


}


