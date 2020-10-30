let queryString = window.location;
let object = document.querySelector('.profile');
let photoData = document.querySelector('.photo_data');
let profilePhotos = document.querySelector('.user_photos'); 
let profileLikes = document.querySelector('.user_likes');
let profileCollections = document.querySelector('.user_collections');
let formatter = new Intl.NumberFormat('en', {
    notation: 'compact'
})

const fetchProfile = async () => {
    const profile = await fetch("/profile", {
        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({queryString})
    })
    const profileData = await profile.json();
    console.log(profileData);

    let profile_image = profileData.profile_image.large;
    let avatar = profile_image.slice(0, 67);
    let pics = profileData.total_photos;
    let collected = profileData.total_collections;
    let liked = profileData.total_likes;
    let followers = profileData.followers_count;
    let following = profileData.following_count;
    let downloads = profileData.downloads;
    let username = `@${profileData.username}`;
    let name = profileData.name;

    document.title = `${name} (${username}) | Splashgram`;

    let profileObject = {
        name: name,
        avatar: avatar,
        bio: profileData.bio ? profileData.bio : "",
        location: profileData.location ? profileData.location : "",
        portfolio: profileData.portfolio_url ? profileData.portfolio_url : "", 
        photos: formatter.format(pics),
        followers: formatter.format(followers),
        following: formatter.format(following),
        downloads: formatter.format(downloads),
        collections: formatter.format(collected),
        likes: formatter.format(liked)
    }

    object.innerHTML += newObject(profileObject)

    function newObject(profileObject) {
        return `
        <div class="box1">
            <div class="image_box">
                <img class="avatar" src="${profileObject.avatar}" alt="avatar">
            </div>
            <div class="description">
                <span id="profile_name">${profileObject.name}</span>
                <p id="profile_bio">
                    ${profileObject.bio}
                </p>
                <div class="user_info">
                    <div id="user_origin">
                        ${profileObject.location}
                    </div>
                    
                    <div id="user_website">
                        <a href="${profileObject.portfolio}" target="_blank" rel="noopener noreferrer nofollow">${profileObject.portfolio}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="box2">
            <div class="data">
                <div>${profileObject.followers}</div>
                <div>Followers</div>
            </div>
            <div class="data">
                <div>${profileObject.following}</div>
                <div>Following</div>
            </div>
            <div class="data">
                <div>${profileObject.downloads}</div>
                <div>Downloads</div>
            </div>
        </div>        
        `
    }

    photoData.innerHTML += newDataBox(profileObject)
    function newDataBox(profileObject) {
        return `
            <div class="box3">
                <div class="tab">
                    <div class="photo_btn">${profileObject.photos} Photos</div>
                </div>
                <div class="tab">
                    <div class="likes_btn">${profileObject.likes} Likes</div>
                </div>
                <div class="tab">
                    <div class="collections_btn">${profileObject.collections} Collections</div>
                </div>
            </div>
        `
    }

    // User Photos
    const photos = await fetch("/profile/photos", {
        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({queryString})
    })
    const userPhotos = await photos.json()

    for (i = 0; i < userPhotos.length; i++) {
        let imageObject = {
            profileImage: userPhotos[i].user.profile_image.large,
            fullname: userPhotos[i].user.name,
            image: userPhotos[i].urls.regular,
            alt: userPhotos[i].urls.alt_description,
            likes: userPhotos[i].likes,
            imageID: userPhotos[i].id, 
            user: userPhotos[i].user.username
        }

        profilePhotos.innerHTML += newImageObject(imageObject);
    }

    function newImageObject(imageObject) {
    return `
            <div class="container">
                <div class="identifier">
                    <div class="profile-img">
                        <img class="icon" src="${imageObject.profileImage}"/>
                    </div>
                    <div class="nameplate">
                       <span>${imageObject.fullname}</span>
                    </div>
                </div>
                <div class="photo-box">
                    <img src="${imageObject.image}" alt="${imageObject.alt}">
                </div>
                <div class="activity">
                    <div class="activity-btn">
                        <i class="fas fa-heart"><span class="likes">${imageObject.likes} Likes</span></i>
                        <a class="download" href="/photos/${imageObject.imageID}/download"><i class="fas fa-arrow-circle-down"><span class="likes">Download</span></i></a>
                    </div>
                </div>
            </div>
            `;
    }

    // User Likes
    const likes = await fetch("/profile/likes", {
        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({queryString})
    })
    const userLikes = await likes.json();

    for (i = 0; i < userLikes.length; i++) {
        let likeObject = {
            profileImage: userLikes[i].user.profile_image.large,
            fullname: userLikes[i].user.name,
            image: userLikes[i].urls.regular,
            alt: userLikes[i].urls.alt_description,
            likes: userLikes[i].likes,
            imageID: userLikes[i].id, 
            user: userLikes[i].user.username
        }

        profileLikes.innerHTML += newImageObject(likeObject);
    }

    function newImageObject(likeObject) {
    return `
            <div class="container">
                <div class="identifier">
                    <div class="profile-img">
                        <img class="icon" src="${likeObject.profileImage}"/>
                    </div>
                    <div class="nameplate">
                        <a href="/users/${likeObject.user}"><span>${likeObject.fullname}</span></a>
                    </div>
                </div>
                <div class="photo-box">
                    <img src="${likeObject.image}" alt="${likeObject.alt}">
                </div>
                <div class="activity">
                    <div class="activity-btn">
                        <i class="fas fa-heart"><span class="likes">${likeObject.likes} Likes</span></i>
                        <a class="download" href="/photos/${likeObject.imageID}/download"><i class="fas fa-arrow-circle-down"><span class="likes">Download</span></i></a>
                    </div>
                </div>
            </div>
            `;
    }

    // User Collections
    const collections = await fetch("/profile/collections", {
        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({queryString})
    })
    const userCollections = await collections.json()
    console.log(userCollections)

    for (i = 0; i < userCollections.length; i++) {
        let collectionsObject = {
            img1: userCollections[i].preview_photos[0].urls.regular,
            img2: userCollections[i].preview_photos[1].urls.regular,
            img3: userCollections[i].preview_photos[2].urls.regular,
            title: userCollections[i].title,
            pics: userCollections[i].total_photos,
            name: userCollections[i].cover_photo.user.first_name, 
        }

        profileCollections.innerHTML += newCollection(collectionsObject);
    }

    function newCollection(collectionsObject) {
        return `
            <div class="card">
                <div class="collections">
                    <div class="main">
                        <img src="${collectionsObject.img1}" alt="collection"/>
                    </div>
                    <div class="img2">
                        <img src="${collectionsObject.img2}" alt="collection"/>
                    </div>
                    <div class="img3">
                        <img src="${collectionsObject.img3}" alt="collection"/>
                    </div>
                </div>
                <div class="text_panel">
                    <div class="text">${collectionsObject.title}</div>
                    <div class="text-total">${collectionsObject.pics} Photos - Curated by ${collectionsObject.name}</div>
                </div>
            </div>
        `
    }

    let script = document.createElement('script');
    script.src = "../js/functions.js";
    document.body.append(script);

}

fetchProfile();


