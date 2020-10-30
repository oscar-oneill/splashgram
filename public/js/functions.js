// Buttons
let photos = document.querySelector('.photo_btn'); 
let likes = document.querySelector('.likes_btn');
let collections = document.querySelector('.collections_btn');

// Profile Data (User photos are displayed by default)
let photosData = document.querySelector('.user_photos');
let likesData = document.querySelector('.user_likes');
let collectionsData = document.querySelector('.user_collections');

likes.addEventListener('click', () => {
    if (likesData.style.display != 'flex') {
        (likesData.style.display = 'flex') && (photosData.style.display = 'none') && (collectionsData.style.display = 'none')
    }
})

photos.addEventListener('click', () => {
    if (photosData.style.display != 'flex') {
        (photosData.style.display = 'flex') && (likesData.style.display = 'none') && (collectionsData.style.display = 'none')
    }
})

collections.addEventListener('click', () => {
    if (collectionsData.style.display != 'flex') {
        (collectionsData.style.display = 'flex') && (likesData.style.display = 'none') && (photosData.style.display = 'none')
    }
})