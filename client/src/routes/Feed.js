import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../Context/userContext'
import Media from '../Components/Media'

const Feed = () => {
  const { photos } = useContext(userContext);
  const [media, setMedia] = useState("");
  document.title = "Home | Splashgram"

  useEffect(() => {
    if (photos) {
      setMedia(photos)
    }
  }, [photos])

  const style = { 
    height: "auto", 
    width: "100%", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column",
    position: "absolute",
    top: "45px",
    backgroundColor: "var(--background-color)",
    transition: "var(--transition)",
    paddingBottom: "15px"
  }

  return (
    <div style={style}>
      {media && media.map((data) => (
        <Media
          key={data.id}
          id={data.id}
          profile={data.user.profile_image.large}
          name={data.user.name}
          image={data.urls.regular}
          alt={data.urls.alt_description}
          likes={data.likes} // Initial Prop Value
          userLiked={data.liked_by_user} // Initial Prop Value
          username={data.user.username}
          userCollectionsID={data.current_user_collections}
          URL={data.user.links.html}
          download={data.links.download}
          downloadLocation={data.links.download_location}
        />
      ))}
    </div>
  )
}

export default Feed
