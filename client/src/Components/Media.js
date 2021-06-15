import React, { useRef, useState, useContext, useEffect } from 'react'
import { userContext } from '../Context/userContext'
import '../styles/Media.css'
import axios from 'axios'
import ExifData from './ExifData'
import Collections from './Collections'

const Media = ({ profile, name, image, alt, likes, userLiked, id, URL, username, userCollectionsID }) => {
    const { REACT_APP_UNSPLASH_API_KEY } = process.env;
    const token = localStorage.getItem("access_token");
    const { userData } = useContext(userContext);
    const [loggedUser, setLoggedUser] = useState("");
    const [collections, setCollections] = useState("");

    const likedRef = useRef(null);
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(likes);
    const [updateLikes, setUpdateLikes] = useState(userLiked);

    const optionsRef = useRef(null);
    const [options, setOptions] = useState(false);
    const showOptions = () => setOptions(!options);

    const exifRef = useRef(null);
    const [exif, setExif] = useState(false);
    const showExif = () => setExif(!exif);

    const collectionRef = useRef(null);
    const [collection, setCollection] = useState(false);
    const showCollections = () => setCollection(!collection);

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [aperture, setAperture] = useState("");
    const [focalLength, setFocalLength] = useState("");
    const [iso, setIso] = useState("");
    const [speed, setSpeed] = useState("");
    const [date, setDate] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [location, setLocation] = useState("");
    const [views, setViews] = useState("");

    useEffect(() => {
        if (exif === true && options === true) {
            setExif(false)
            setOptions(false)
        }

        if (collection === true && options === true) {
            setCollection(false)
            setOptions(false)
        }
    }, [exif, options, collection])

    useEffect(() => {
        if (userData) {
            setLoggedUser(userData.username)
        }
    }, [userData])

    const likeEvent = (e) => {
        updateLike(e);
        likesHandler(e);
    }

    const getExifData = () => {
        const config = {
            headers: {
                Authorization: `Client-ID ${REACT_APP_UNSPLASH_API_KEY}`,
            },
        }

        axios.get(`https://api.unsplash.com/photos/${id}`, config)
        .then(res => {
            setMake(res.data.exif.make)
            setModel(res.data.exif.model)
            setAperture(res.data.exif.aperture)
            setFocalLength(res.data.exif.focal_length)
            setIso(res.data.exif.iso)
            setSpeed(res.data.exif.exposure_time)
            setDate(new Date(res.data.created_at))
            setHeight(res.data.height)
            setWidth(res.data.width)
            setLocation(res.data.location.name)
            setViews(res.data.views)
        })
    }

    // Retrieves List of Collections
    const getCollections = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      axios.get(`https://api.unsplash.com/users/${loggedUser}/collections`, config)
      .then(res => {
          setCollections(res.data)
      })
    }

    const download = () => {
        const config = {
            headers: {
                Authorization: `Client-ID ${REACT_APP_UNSPLASH_API_KEY}`,
            },
        }
        axios.get(`https://api.unsplash.com/photos/${id}/download`, config)
        .then(res => {
            window.location = res.data.url
        })
    }

    const updateLike = () => setLiked(!liked);

    const likesHandler = () => {
        if (updateLikes === false) {
            axios({
                method: "post",
                url: `https://api.unsplash.com/photos/${id}/like`,
                headers: {
                    'Accept-Version': 'v1',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                    setLikedCount(res.data.photo.likes)
                    setUpdateLikes(res.data.photo.liked_by_user)
                })
            .catch(error => {
                if (error) {
                    alert("Please sign in with Unsplash to perform this action.")
                }
            })
        }

        if (updateLikes === true) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            axios.delete(`https://api.unsplash.com/photos/${id}/like`, config)
            .then(res => {
                setLikedCount(res.data.photo.likes)
                setUpdateLikes(res.data.photo.liked_by_user)
            }
        )}
    } 

    return (
        <div className="container">
            <a href={`/user/${username}/profile`}>
                <div className="identifier">
                    <div className="profile-img">
                        <img className="icon" src={profile} alt="avatar"/>
                    </div>
                    <div className="nameplate">
                        <span>{name}</span>
                    </div>
                </div>
            </a>
            <div className={"photo-box"}>
                <img src={image} alt={alt}/>

                <div ref={exifRef} className={`exif_data ${exif ? "active" : "inactive"}`}>
                    <div className="close" style={{marginBottom: "10px", marginLeft: "3px", cursor: "pointer", height: "auto", width: "25px"}} onClick={showExif}>
                        <i className="fas fa-times"></i>
                    </div>
                    <ExifData
                        make={make}
                        focalLength={focalLength}
                        model={model}
                        iso={iso}
                        speed={speed}
                        width={width}
                        height={height}
                        aperture={aperture}
                        date={date}
                        location={location}
                        views={views}
                    />
                </div>

                <div ref={collectionRef} className={`collections ${collection ? "active" : "inactive"}`}>
                    <div className="collections-top">
                        <span onClick={showCollections} style={{marginLeft: "3px", cursor: "pointer", height: "auto", width: "25px"}}><i className="fas fa-times"></i></span>
                        <span style={{textAlign: "center"}}>Select A Collection</span>    
                    </div>
                    
                    <div className="collections-list">
                        <ul>
                            {collections && collections.map((collection) => (
                                <Collections
                                    key={collection.id}
                                    title={collection.title}
                                    photoID={id}
                                    collectionID={collection.id}
                                    userCollections={userCollectionsID}             
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div ref={optionsRef} className={`photo-options ${options ? "active" : "inactive"}`}>
                    <ul className="options_list">
                        <li onClick={(e) => download(e)}>
                            <i className="fas fa-arrow-circle-down">
                                <span className="options-btn">Download Photo</span>
                            </i>
                        </li>
                        <li className={`collection-btn ${token ? "active" : "inactive"}`} onClick={(e) => {getCollections(e); showCollections(e); showOptions(false)}}>
                            <i className="fas fa-plus">
                                <span className="options-btn">Add To Collection</span>
                            </i>
                        </li>

                        <li className="exif" onClick={(e) => {getExifData(e); showExif(e); showOptions(false)}}>
                            <i className="fas fa-image">
                                <span className="options-btn">EXIF Data</span>
                            </i>
                        </li>

                        <li className="share_photo">
                            <i className="fas fa-external-link-alt">
                                <a href={URL} target="_blank" className="options-btn" rel="noopener noreferrer nofollow">View This Photo On Unsplash</a>
                            </i>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="activity">
                <div className="activity-btn">
                    <div ref={likedRef} onClick={likeEvent}>
                        <i className={`${updateLikes === true ? "fas fa-heart active" : "far fa-heart"}`}>
                            <span className="likes">{likedCount.toLocaleString()} Likes</span>
                        </i>
                    </div>
                </div>

                <div className="shelf" onClick={(e) => {showOptions(e)}}>
                    <i className="fas fa-cog"></i>
                </div>
            </div>
        </div>
    );
};

export default Media;