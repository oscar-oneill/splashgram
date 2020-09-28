let objects = document.querySelector('.objects');

async function fetchDefault() {
    const response = await fetch('/photos');
    const data = await response.json();
    console.log(data);

    for (i = 0; i < data.length; i++) {
        let photoObject = {
            profileImage: data[i].user.profile_image.large,
            fullname: data[i].user.name,
            image: data[i].urls.regular,
            alt: data[i].urls.alt_description,
            likes: data[i].likes,
            imageID: data[i].id
        }

        objects.innerHTML += addNewObject(photoObject);
    }

    function addNewObject(photoObject) {
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="profile-img">
                            <img class="icon" src="${photoObject.profileImage}">
                        </div>
                        <div class="nameplate">
                            <span>${photoObject.fullname}</span>
                        </div>
                    </div>
                    <div class="photo-box">
                        <img src="${photoObject.image}" alt="${photoObject.alt}">
                    </div>
                    <div class="activity">
                        <div class="activity-btn">
                            <i class="fas fa-heart"><span class="likes">${photoObject.likes} Likes</span></i>
                            <a class="download" href="/photos/${photoObject.imageID}/download"><i class="fas fa-arrow-circle-down"><span class="likes">Download</span></i></a>
                        </div>
                    </div>
                </div>
                `;
    }
}

fetchDefault();

form.addEventListener('submit', e => {
    e.preventDefault();
    let inputRequest = document.querySelector('.input-request').value;

    if(inputRequest) {
        search(inputRequest)
    }
});

const search = async (inputRequest) => {
    try {
        console.log('Search query:', inputRequest);
        const response = await fetch('/api/search', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputRequest })
        })

        console.log(response)
        const res = await response.json();


        console.log(res)
        showData(res);
    } catch (error) {
        console.log('Message error:', error);
    }
};

const showData = (res) => {
    let html = '';
    res.results.forEach(e => {
        html += `
                    <div class="container">
                        <div class="identifier">
                            <div class="profile-img">
                                <img class="icon" src="${e.user.profile_image.large}">
                            </div>
                            <div class="nameplate">
                                <span>${e.user.name}</span>
                            </div>
                        </div>
                        <div class="photo-box">
                            <img src="${e.urls.regular}" alt="${e.alt_description}">
                        </div>
                        <div class="activity">
                            <div class="activity-btn">
                                <i class="fas fa-heart"><span class="likes">${e.likes} Likes</span></i>
                                <a class="download" href="/photos/${e.id}/download"><i class="fas fa-arrow-circle-down"><span class="likes">Download</span></i></a>
                            </div>
                        </div>
                    </div>
                `;
    });
    objects.innerHTML = html;
};