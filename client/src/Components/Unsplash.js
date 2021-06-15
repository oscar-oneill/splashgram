const authEndpoint = "https://unsplash.com/oauth/authorize";
const client_id = process.env.REACT_APP_UNSPLASH_API_KEY;
const redirect_uri = process.env.REACT_APP_UNSPLASH_REDIRECT;
const scopes = [
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos",
  "write_likes",
  "write_followers",
  "read_collections",
  "write_collections",
];

const accessUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("+")}&response_type=code`

export default accessUrl