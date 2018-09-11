
//variable to hold the user's access token
let accessToken = '';

//some more variables
let clientID = '21c7cafb2d76469f83cffccac2315196';
let redirectURI = 'http://localhost:3000/';
let url = 'https://accounts.spotify.com/authorize';


//creating the Spotify module
const Spotify = {

  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    } else {
      fetch(`${url}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`).then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      //code to execute JSON response--is the response a URL with the token in it?
      //If so, parse the response/url and find the token and save store it into accessToken
      if(jsonResponse.match("access_token")) {
        //enter code to extract access token
        //store the access token in a const
        const accessToken = jsonResponse.slice((jsonResponse.match("access_token=").index + ("access_token=".length)), jsonResponse.match("&token_type").index);

        //check if there is an expiration parameter
        if(jsonResponse.match("&expires_in=")) {
          //store the expiration time in a const
          const expiresIn = jsonResponse.slice((jsonResponse.match("&expires_in=").index + ("&expires_in=".length)), jsonResponse.match("&state").index);

          //enter code for time out and clearing parameters. Find it in the hint for step 80.
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');

        }//end nested if statement for expiration
        console.log(`Access token received, and will expire in ${tokenExpiration} seconds.`)

        //set window to the following url to redirect temporarily to Spotify
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

      } else {
        console.log('No Access Token Provided.')
      }//end if statement for accessToken check
    });//end code block for jsonResponse
  }//end if statement (previous was all apart of the fetch())
  } //end getAccessToken method

  search(searchTerm) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }
    ).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
      //map the converted JSON to an array of tracks if not empty
      const tracksArray = []; //array of track objects with properties ID, Name, Artist, Album, and URI

      if(jsonResponse !== {}) { //find out what the response property is for tracks
        jsonResponse.map(responseIndex => {
          tracksArray[responseIndex] = {
            tracksArray[responseIndex].id: track[responseIndex].id,
            tracksArray[responseIndex].name: track[responseIndex].name,
            tracksArray[responseIndex].artist: track[responseIndex].artists[0].name,
            tracksArray[responseIndex].album: track[responseIndex].album.name,
            tracksArray[responseIndex].uri: track[responseIndex].uri
          }//storing each track object into the array of track objects
        });//end map method of jsonResponse
        return tracksArray;
      } else {
        return tracksArray;//if there's a response, add to the array, otherwise, return an empty array.
      }//end conditional statement

    });//end code block for search method's jsonResponse

  }//end search method to search tracks in Spotify

  savePlaylist(playlistName, playlistTrackURIs) {
    //writes the user's custom playList (see App component) to their Spotify account
    //Make 3 requests: GET user's ID, POST new playlist, POST track URI's.

    //First, check that values were passed in the parameters
    if(playlistName === '' && playlistTrackURIs === []) {
      return console.log('No name or playlist passed to save to Spotify.');
    } else {
      //GET current user's ID
      let userID = '';
      fetch('https://api.spotify.com/v1/me', {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      //code block for current user ID fetch GET; storing the current user's id into a variable
      userID = jsonResponse.id;
    });//end code block for user id GET

    //POST new playlist (with input name from Playlist) to user's Spotify account. Remember for this to work, we are calling in App and passing App's state.playlistName and state.playlistTracks
    //Must also receive this newly created playlist's id back from this request
    async function getData() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: 'POST',
          body: JSON.stringify({id: '200'}),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Content-Type: 'application/json'
          }//end headers
        });//end fetch
        if(response.ok) {
          const jsonResponse = await response.json();
          //code block to use with jsonResponse
          jsonResponse.name = playlistName;
          const playlistID = jsonResponse.id;
        }
        throw new Error('Request Failed!');
      } catch (error) {
        console.log(error);
      }//end try/catch
    }//end async await POST request to create a new playlist

    //POST tracks to the playlist we made in the POST directly above
    //use playlistID which we received and stored from that POST
    async function getData() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
          method: 'POST',
          body: JSON.stringify(playlistTrackURIs),//passing the array of Spotify uris
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Content-Type: 'application/json'
          }//end headers
        });//end fetch
        if(response.ok) {
          const jsonResponse = await response.json();
          //code block to use with jsonResponse
          playlistID = jsonResponse.id;
        }
      } catch (error) {
        console.log(error);
      }//end try/catch
    }//end POST tracks to playlist


  }//end beginning if/else

  }//end savePlaylist



};//end Spotify module

export default Spotify;
