import React, { useState } from 'react'
import axios from 'axios'

const Collections = ({title, collectionID, photoID, userCollections}) => {
    const [status, setStatus] = useState(userCollections);

    let arr = [];

    const setArray = () => {
        for (let i = 0; i < status.length; i++) {
            arr.push(`${status[i].id === collectionID}`)
        }
    }
    setArray()

    const checkValue = (val) => {  
        return val === "true"
    }

    // Adding/Removing a Photo to/from a Collection
    const addPhoto = () => {
        if (arr.find(checkValue) !== "true") {
            axios.post("/media/add_photo", {
                photoID,
                collectionID
            })
            .then(res => {
                setStatus(res.data.photo.current_user_collections)
            })
        } 

        if (arr.find(checkValue) === "true") {
            axios.post("/media/add_photo", {
                photoID,
                collectionID
            })
            .then(res => {
                setStatus(res.data.photo.current_user_collections)
            })
        }
    }

    return (
        <li>
            {title}
            <i onClick={(e) => addPhoto(e)} className={`${arr.find(checkValue) === "true" ? "fas fa-check-circle" : "fas fa-plus-circle"}`} 
               style={{position: "absolute", right: "10px", cursor: "pointer"}}>
            </i>
        </li>
    )
}

export default Collections
