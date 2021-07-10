import React, { useEffect, useState } from 'react'
import Media from '../Components/Media'
import axios from 'axios'

const Photo = () => {
    const id = window.location.pathname.slice(7);

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(undefined);

    useEffect(() => {
        axios.post("/main/photo", {
            id
        }).then(res => {
            setData(res.data);
            setLoading(false);
            document.title = `Photo by ${res.data.user.name} (@${res.data.user.username}) on Splashgram`
        })
    }, [id])

    const style = { 
        height: "auto", 
        width: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "column",
        position: "absolute",
        top: "45px",
        backgroundColor: "var(--background-color)",
        transition: "var(--transition)",
        paddingBottom: "15px"
    }

    if (loading) {
        return <div style={style}>Loading...</div>
    }

    return (
        <div style={style}>
            {data ? (
                <Media
                    data={data}
                    id={id}
                    profile={data.user.profile_image.large}
                    name={data.user.name}
                    image={data.urls.regular}
                    alt={data.urls.alt_description}
                    likes={data.likes}
                    userLiked={data.liked_by_user}
                    username={data.user.username}
                    userCollectionsID={data.current_user_collections}
                    URL={data.user.links.html}
                    download={data.links.download}
                    downloadLocation={data.links.download_location}
                />
            ) : "Loading..."}
        </div>
    )
}

export default Photo
