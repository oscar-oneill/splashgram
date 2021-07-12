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
import Photo from './routes/Photo'
import Search from './routes/Search'

function App() {  
  const token = localStorage.getItem("access_token"); // eslint-disable-next-line 
  const accessToken = authenticate(); 
  const [userData, setUserData] = useState(undefined);
  const [loggedUsername, setLoggedUsername] = useState(undefined);
  const [photos, setPhotos] = useState("");

  // Fetch Logged-In User's Profile Data
  useEffect(() => {
    if (token) {
      axios.post('/user/me')
      .then(res => {
        setUserData(res.data)
        setLoggedUsername(res.data.username)
      })
    }
  }, [token])

  return (
    <Router>
      <div className="App"> 
        <userContext.Provider value={{ userData, setUserData, photos, setPhotos, loggedUsername, setLoggedUsername }}>
          <Navigation token={token}/>
          <Route exact path="/" component={Feed}/>
          <Route exact path="/me" render={props => token ? <Me {...props} token={token}/> : <Redirect to="/"/>}/>
          <Route exact path="/user/:username/profile" component={UserProfile}/>
          <Route exact path="/photo/:id" component={Photo}/>
          <Route exact path="/search/results/:query" component={Search}/>
        </userContext.Provider>
      </div>
    </Router>
  ); 
}

export default App;
