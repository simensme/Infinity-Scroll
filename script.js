const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKEY = '';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

// Helper funciton to set attributes on DOM elements
const setAttributes = (e, attributes) => {
    for (const key in attributes) {
        e.setAttribute(key, attributes[key])
    };
};

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
};

// Get photos from API
const getPhotos = async () => {
    try {
        const res = await fetch(apiURL);
        photosArray = await res.json();
        displayPhotos();
    } catch (err) {
        // Error handling
    }
};

// On load
// getPhotos();