import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Navigation.css'
import { userContext } from '../Context/userContext'
import Authorized from './Authorized'
import Login from './Login'

const Navigation = ({token}) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("new york"); // eslint-disable-next-line
  const { photos, setPhotos } = useContext(userContext);

  useEffect(() => {
    getPhotos() // eslint-disable-next-line
  }, [query])

  const getPhotos = () => {
    const { REACT_APP_UNSPLASH_API_KEY } = process.env;

    if (token) {
        const config = {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Bearer ${token}`
            }
        }

        axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query}&order_by=popular`, config)
        .then(res => {
            setPhotos(res.data.results)
        })
    } 
    
    if (!token) {
        const config = {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
            'Authorization': `Client-ID ${REACT_APP_UNSPLASH_API_KEY}`
            }
        }

        axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=30&order_by=popular`, config)
        .then(res => {
            setPhotos(res.data.results)
        })
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
  }

    return (
        <>
            <div className="navbar">
                <Link to="/">
                    <div className="title">
                        <svg id="logo" width="941" height="779" viewBox="0 0 941 779" xmlns="http://www.w3.org/2000/svg">
                            <path d="M660.51 76.7114C717.764 114.49 770.156 156.585 827.949 210.554C885.202 264.523 948.396 330.904 940.295 392.429C932.733 453.953 853.875 510.62 803.643 577.541C753.412 644.463 731.807 720.558 682.115 755.098C632.964 789.099 555.726 781.003 487.131 766.432C418.535 751.86 358.041 730.812 286.745 709.225C215.448 687.638 132.809 665.51 76.0963 613.161C19.3833 561.351 -11.9439 478.779 4.25977 405.921C20.4635 333.063 84.1981 269.919 137.13 211.094C190.603 152.268 232.732 98.2989 287.825 59.4415C342.918 20.0443 410.433 -4.24166 475.788 0.615523C541.143 5.47271 603.257 38.9333 660.51 76.7114Z" fill="#7FFFD4"/>
                        </svg>
                        <span>Splashgram</span>
                    </div>
                </Link>

                <form className="form" id="form" onSubmit={getSearch}>
                    <input className="input-request" type="text" autoComplete="false" placeholder="Search free HD photos" onChange={updateSearch} required/>
                    <button className="submit-btn" type="submit" name="submit-btn"><i className="fas fa-search"></i></button>
                </form>

                {token ? <Authorized/> : <Login/>}
            </div>
        </>
    )
}

export default Navigation;