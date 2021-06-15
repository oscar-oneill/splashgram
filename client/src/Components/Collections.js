import React, { useState } from 'react'
import axios from 'axios'

const Collections = ({title, collectionID, photoID, userCollections}) => {
    const token = localStorage.getItem("access_token");
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

    // Adding a Photo to a Collection
    const addPhoto = () => {
        if (arr.find(checkValue) !== "true") {
            axios({
                method: "post",
                url: `https://api.unsplash.com/collections/${collectionID}/add?photo_id=${photoID}`,
                headers: {
                    'Accept-Version': 'v1',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                setStatus(res.data.photo.current_user_collections)
            })
        } 

        if (arr.find(checkValue) === "true") {
            axios({
                method: "delete",
                url: `https://api.unsplash.com/collections/${collectionID}/remove?photo_id=${photoID}`,
                headers: {
                    'Accept-Version': 'v1',
                    'Authorization': `Bearer ${token}`
                }
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
