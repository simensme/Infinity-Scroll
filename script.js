const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
const count = 5;
const apiKEY = 'INSERT_API_KEY_HERE';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
};

// Helper funciton to set attributes on DOM elements
const setAttributes = (e, attributes) => {
    for (const key in attributes) {
        e.setAttribute(key, attributes[key])
    };
};

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
         });
        //  Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

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

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
         getPhotos();
    }
});

// On load
// getPhotos();