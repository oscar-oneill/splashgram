import React, { useRef, useState, useContext, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../Context/userContext'
import DarkMode from '../Components/DarkMode'
import defaultImage from '../images/default.png'
import axios from 'axios'

const Authorized = () => {
    const optionsRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const showMenu = () => setMenu(!menu);

    const { userData } = useContext(userContext);
    const [first, setFirst] = useState("");
    const [icon, setIcon] = useState("");

    useEffect(() => {
        if (userData) {
            setFirst(userData.first_name)
            setIcon(userData.profile_image.large)
        }
    }, [userData])

    const logout = (e) => {
        e.preventDefault();
        axios.post("/auth/logout").then((res) => {console.log(res)})
        localStorage.clear();
        window.location = "/";
    }

    return (
        <>
            <div className="signed_in" onClick={showMenu}>  
                <span style={{marginTop: "6px"}}>Welcome, {first}</span>
                <img className="signed_icon" src={icon ? icon : defaultImage} alt="avatar"/>
            </div>
            <div ref={optionsRef} className={`nav_menu ${menu ? "active" : "inactive"}`} >
                <ul className="menu_items">
                    <li onClick={() => showMenu(false)}>
                        <Link to="/me">Profile</Link>
                    </li>
                    <li onClick={() => showMenu(false)}>
                        <DarkMode/>
                    </li>
                    <li onClick={(e) => logout(e)}>Logout</li>
                </ul>
            </div>
        </>
    )
}

export default Authorized
