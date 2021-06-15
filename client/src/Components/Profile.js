import React from 'react'
import '../styles/Profile.css'
import defaultImage from '../images/default.png'

const Profile = ({name, bio, location, followers, following, downloads, portfolio, image, photos, likes, collections}) => {
    let formatter = new Intl.NumberFormat('en', {
        notation: 'compact'
    })

    return (
        <div className="profile_container">
            <div className="profile_card">
                <div className="box1">
                    <div className="image_box">
                        <img className="avatar" src={image ? image.slice(0, 67) : defaultImage} alt="avatar"/>
                    </div>
                    <div className="description">
                        <div id="profile_name">
                            {name}
                        </div>
                        <p id="profile_bio">
                            {bio ? bio : ""}
                        </p>
                        <div className="user_info">
                            <div id="user_origin">
                                {location ? location : ""}
                            </div>
                            
                            <div id="user_website">
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

            <div className="">
                
            </div>
        </div>
    )
}

export default Profile
