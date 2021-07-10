import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../Context/userContext'
import Profile from '../Components/Profile'
import axios from 'axios'

const Me = () => {
    const token = localStorage.getItem("access_token");
    const { userData, loggedUsername } = useContext(userContext);
    const [name, setName] = useState(null);
    const [bio, setBio] = useState(null);
    const [location, setLocation] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [downloads, setDownloads] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [image, setImage] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [likes, setLikes] = useState(null);
    const [collections, setCollections] = useState(null);

    const [userPhotos, setUserPhotos] = useState(undefined);
    const [userLiked, setUserLiked] = useState(undefined);
    const [photoCollections, setPhotoCollections] = useState(undefined);

    document.title = "My Profile on Splashgram"

    // Set Current User's Data
    useEffect(() => {
        if (userData) {
            setName(userData.name)
            setBio(userData.bio)
            setLocation(userData.location)
            setFollowers(userData.followers_count)
            setFollowing(userData.following_count)
            setDownloads(userData.downloads)
            setPortfolio(userData.portfolio_url)
            setImage(userData.profile_image.large)
            setLikes(userData.total_likes)
            setPhotos(userData.total_photos)
            setCollections(userData.total_collections)
        }
    }, [userData])

    // Fetch Current User's Photos
    useEffect(() => {
        axios.post("/user/photos", {
            loggedUsername
        })
        .then(res => {
            setUserPhotos(res.data)
        })
    }, [token, loggedUsername])

    // Fetch Current User's Liked Photos
    useEffect(() => {
        axios.post("/user/likes", {
            loggedUsername
        })
        .then(res => {
            setUserLiked(res.data)
        })
    }, [token, loggedUsername])

    // Fetch Current User's Collections
    useEffect(() => {
        axios.post("/user/collections", {
            loggedUsername
        })
        .then(res => {
            setPhotoCollections(res.data)
        })
    }, [token, loggedUsername])

    return (
        <>
            <Profile
                name={name}
                bio={bio}
                location={location}
                followers={followers}
                following={following}
                downloads={downloads}
                portfolio={portfolio}
                image={image}
                photos={photos}
                likes={likes}
                collections={collections}
                userLiked={userLiked}
                userPhotos={userPhotos}
                userCollections={photoCollections}
            />
        </>
    )
}

export default Me
