let objects = document.querySelector('.objects');

form.addEventListener('submit', e => {
    e.preventDefault();
    let inputRequest = document.querySelector('.input-request').value;
    let users = document.querySelector('.users')

    if (!users.checked){
        unchecked(inputRequest)
    } else {
        checked(inputRequest)
    }
});

const unchecked = async (inputRequest) => {
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
                                <i class="fas fa-info-circle info-button"></i>
                            </div>
                        </div>
                        <div class="photo-box">
                            <img src="${e.urls.regular}" alt="${e.alt_description}">
                        </div>
                        <div class="activity">
                            <div class="activity-btn">
                                <i class="fas fa-heart"></i>
                                <i class="fas fa-folder-plus"></i>
                                <a class="download" href="${e.links.download}?force=true" download=${e.links.download}><i class="fas fa-download"></i></a>
                            </div>
                        </div>
                    </div>
                `
    });
    objects.innerHTML = html;
};

async function fetchDefault() {
    const response = await fetch("https://splashgram.herokuapp.com/photos");
    const data = await response.json();
    console.log(data);

    for (i = 0; i < data.length; i++) {
        let photoObject = {
            profileImage: data[i].user.profile_image.large,
            fullname: data[i].user.name,
            image: data[i].urls.regular,
            alt: data[i].urls.alt_description,
            downloadLink: data[i].links.download,
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
                                <i class="fas fa-info-circle info-button"></i>
                            </div>
                        </div>
                        <div class="photo-box">
                            <img src="${photoObject.image}" alt="${photoObject.alt}">
                        </div>
                        <div class="activity">
                            <div class="activity-btn">
                                <i class="fas fa-heart"></i>
                                <i class="fas fa-folder-plus"></i>
                                <a class="download" href="${photoObject.downloadLink}?force=true" download=${photoObject.downloadLink}><i class="fas fa-download"></i></a>
                            </div>
                        </div>
                    </div>
                `
    }
}

fetchDefault();


