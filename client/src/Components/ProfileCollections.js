import React from 'react'

const ProfileCollections = ({ title, coverPhoto, link }) => {
    const noImage = "https://coolbackgrounds.io/images/backgrounds/black/pure-black-background-f82588d3.jpg"

    const image = {
        height: "200px",
        width: "350px",
        borderRadius: "10px",
        objectFit: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    }

    const span = {
        position: "relative",
        top: "-105px",
        zIndex: "2",
        color: "#ffffff"
    }
    
    return (
        <a href={link} target="_blank" rel="noopener noreferrer nofollow">
            <div className="image_wrap">
                <img style={image} src={(coverPhoto === null ? noImage : coverPhoto.urls.regular)} alt={title}/>
                <span style={span}>{title}</span>
            </div>
        </a>
    )
}

export default ProfileCollections
