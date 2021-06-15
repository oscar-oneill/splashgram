import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../Context/userContext'
import Profile from '../Components/Profile'

const Me = () => {
    const { userData } = useContext(userContext)
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

    document.title = "My Profile on Splashgram"

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

export default Me
