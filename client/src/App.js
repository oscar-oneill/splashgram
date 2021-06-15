import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Navigation from './Components/Navigation'
import Me from './routes/Me'
import UserProfile from './routes/UserProfile'
import Feed from './routes/Feed'
import authenticate from './Hooks/authenticate'
import { userContext } from './Context/userContext'

function App() {  
  const token = localStorage.getItem("access_token"); // eslint-disable-next-line
  const accessToken = authenticate(); 
  const [userData, setUserData] = useState(undefined);
  const [photos, setPhotos] = useState("");

  useEffect(() => {
    if (token) {
      axios.get('https://api.unsplash.com/me', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Version': 'v1',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        setUserData(res.data)
      })
    }
  }, [token])

  return (
    <Router>
      <div className="App"> 
        <userContext.Provider value={{ userData, setUserData, photos, setPhotos }}>
          <Navigation token={token}/>
          <Route exact path="/" component={Feed}/>
          <Route exact path="/me" render={props => token ? <Me {...props} token={token}/> : <Redirect to="/"/>}/>
          <Route exact path="/user/:username/profile" component={UserProfile}/>
        </userContext.Provider>
      </div>
    </Router>
  ); 
}

export default App;
