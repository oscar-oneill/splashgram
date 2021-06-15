import React from 'react'
import windowDetect from '../Hooks/windowDetect'
import accessUrl from '../Components/Unsplash'

const Login = () => {
    const size = windowDetect()

    return (
        <button className="action_button" style={{marginLeft: "10px"}}>
            <a style={{marginBottom: "3px"}} href={accessUrl}>
                {size.width < 857 ? "Sign In" : "Sign In with Unsplash"}
            </a>
        </button>
    )
}

export default Login
