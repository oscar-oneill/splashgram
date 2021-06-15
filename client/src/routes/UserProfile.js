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

    const token = localStorage.getItem("access_token");
    const username = window.location.pathname.slice(6, -8);
    const { REACT_APP_UNSPLASH_API_KEY } = process.env;

    document.title = `${name} (@${username}) on Splashgram`

    useEffect(() => {
        const headers = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
            }
        }

        if (token) {
            axios.get(`https://api.unsplash.com/users/${username}`, headers)
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
        } else {
            axios.get(`https://api.unsplash.com/users/${username}?client_id=${REACT_APP_UNSPLASH_API_KEY}`)
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
        } // eslint-disable-next-line
    }, [username])

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
            />
        </>
    )
}

export default UserProfile
