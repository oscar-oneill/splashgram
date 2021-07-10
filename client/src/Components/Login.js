import React from 'react'
import windowDetect from '../Hooks/windowDetect'

const Login = () => {
    const size = windowDetect()

    return (
        <button className="action_button" style={{marginLeft: "10px"}}>
            <a style={{marginTop: "6px"}} href="https://splashgram.xyz/authorize">
                {size.width < 857 ? "Sign In" : "Sign In with Unsplash"}
            </a>
        </button>
    )
}

export default Login
