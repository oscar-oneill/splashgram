import React, { useEffect } from 'react'
import '../styles/Profile.css'
import defaultImage from '../images/default.png'
import Media from '../Components/Media'
import ProfileCollections from '../Components/ProfileCollections'

const Profile = ({name, bio, location, followers, following, downloads, portfolio, image, photos, likes, collections, userLiked, userPhotos, userCollections}) => {
    let formatter = new Intl.NumberFormat('en', {notation: 'compact'});

    useEffect(() => {
        let photo = document.querySelector(".photo_btn");
        let liked = document.querySelector(".likes_btn");
        let collections = document.querySelector(".collections_btn");

        let photo_div = document.querySelector(".photo_div");
        let liked_div = document.querySelector(".liked_div");
        let collections_div = document.querySelector(".collections_div");

        liked.addEventListener('click', () => {
            if (liked_div.style.display !== 'flex') {
                (liked_div.style.display = 'flex') && (photo_div.style.display = 'none') && (collections_div.style.display = 'none')
            }
        })

        photo.addEventListener('click', () => {
            if (photo_div.style.display !== 'flex') {
                (photo_div.style.display = 'flex') && (liked_div.style.display = 'none') && (collections_div.style.display = 'none')
            }
        })

        collections.addEventListener('click', () => {
            if (collections_div.style.display !== 'flex') {
                (collections_div.style.display = 'flex') && (liked_div.style.display = 'none') && (photo_div.style.display = 'none')
            }
        })        
    })

    return (
        <div className="profile_container">
            <div className="profile_card">
                <div className="box1">
                    <div className="image_box">
                        <img className="avatar" src={image ? image.slice(0, 67) : defaultImage} alt="avatar"/>
                    </div>
                    <div className="description">
                        <div className="profile_name">
                            {name}
                        </div>
                        <p className="profile_bio">
                            {bio ? bio : ""}
                        </p>
                        <div className="user_info">
                            <div className="user_origin">
                                {location ? location : ""}
                            </div>
                            
                            <div className="user_website">
                                <a href={portfolio ? portfolio : "#"} target="_blank" rel="noopener noreferrer nofollow">{portfolio ? portfolio : ""}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box2">
                    <div className="data">
                        <span>Followers</span>
                        <span>{formatter.format(followers)}</span>
                    </div>
                    <div className="data">
                        <span>Following</span>
                        <span>{formatter.format(following)}</span>
                    </div>
                    <div className="data">
                        <span>Downloads</span>
                        <span>{formatter.format(downloads)}</span>
                    </div>
                </div>   
            </div>

            <div className="box3">
                <div className="tab">
                    <div className="photo_btn">{formatter.format(photos)} Photos</div>
                </div>
                <div className="tab">
                    <div className="likes_btn">{formatter.format(likes)} Likes</div>
                </div>
                <div className="tab">
                    <div className="collections_btn">{formatter.format(collections)} Collections</div>
                </div>
            </div> 

            <div className="data_container">
                <div className="photo_div">
                    {(userPhotos) ? userPhotos.map((data) => (
                        <Media
                            key={data.id}
                            id={data.id}
                            profile={data.user.profile_image.large}
                            name={data.user.name}
                            image={data.urls.regular}
                            alt={data.urls.alt_description}
                            likes={data.likes} // Initial Prop Value
                            userLiked={data.liked_by_user} // Initial Prop Value
                            username={data.user.username}
                            userCollectionsID={data.current_user_collections}
                            URL={data.links.html}
                            download={data.links.download}
                            downloadLocation={data.links.download_location}
                        />
                    )) : <div className="no_display">Nothing here yet...</div>}
                </div>

                <div className="liked_div">
                    {(userLiked) ? userLiked.map((data) => (
                        <Media
                            key={data.id}
                            id={data.id}
                            profile={data.user.profile_image.large}
                            name={data.user.name}
                            image={data.urls.regular}
                            alt={data.urls.alt_description}
                            likes={data.likes} // Initial Prop Value
                            userLiked={data.liked_by_user} // Initial Prop Value
                            username={data.user.username}
                            userCollectionsID={data.current_user_collections}
                            URL={data.links.html}
                            download={data.links.download}
                            downloadLocation={data.links.download_location}
                        />
                    )) : <div className="no_display">Nothing here yet...</div>}
                </div>

                <div className="collections_div">
                    {(userCollections) ? userCollections.map((data) => (
                        <ProfileCollections
                            key={data.id}
                            title={data.title}
                            coverPhoto={data.cover_photo}
                            link={data.links.html}
                        />
                    )) : <div className="no_display">Nothing here yet...</div>}
                </div>
            </div>
        </div>
    )
}

export default Profile
