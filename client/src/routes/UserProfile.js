import React, { useEffect, useState } from 'react'
import Profile from '../Components/Profile'
import axios from 'axios'

const UserProfile = () => {
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
    const [userCollections, setUserCollections] = useState(undefined);

    const token = localStorage.getItem("access_token");
    const username = window.location.pathname.slice(6, -8);

    document.title = `${name} (@${username}) on Splashgram`

    useEffect(() => {
        axios.post("/profile/data", {
            username
        })
        .then(res => {
            setName(res.data.name)
            setBio(res.data.bio)
            setLocation(res.data.location)
            setFollowers(res.data.followers_count)
            setFollowing(res.data.following_count)
            setDownloads(res.data.downloads)
            setPortfolio(res.data.portfolio_url)
            setImage(res.data.profile_image.large)
            setLikes(res.data.total_likes)
            setPhotos(res.data.total_photos)
            setCollections(res.data.total_collections)
        })
    }, [token, username])

    // Fetch a User's Photos
    useEffect(() => {
        axios.post("/profile/photos", {
            username
        })
        .then(res => {
            setUserPhotos(res.data)
        })
    }, [token, username])

    // Fetch a User's Liked Photos
    useEffect(() => {
        axios.post("/profile/likes", { 
            username
        })
        .then(res => {
            setUserLiked(res.data)
        })
    }, [token, username])

    // Fetch a User's Collections
    useEffect(() => {
        axios.post("/profile/collections", {
            username
        })
        .then(res => {
            setUserCollections(res.data)
        })
    }, [token, username])

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
                userCollections={userCollections}
            />
        </>
    )
}

export default UserProfile
