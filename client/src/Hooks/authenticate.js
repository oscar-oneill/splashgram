import { useState, useEffect } from 'react'
import axios from 'axios'

const Authenticate = () => {
    const [accessToken, setAccessToken] = useState(undefined);
    const code = new URLSearchParams(window.location.search).get('code');

    useEffect(() => {
        if (code) {
            axios.post('/auth/login', {
                code,
            })
            .then(res => {
                setAccessToken(res.data.access_token)
                localStorage.setItem("access_token", res.data.access_token)
                window.history.pushState({}, null, "/")
                window.location = "/"
            })
            .catch((err) => {
                window.location = "/"
                console.log(err)
            })
        }
    }, [code]);

    return accessToken
}

export default Authenticate