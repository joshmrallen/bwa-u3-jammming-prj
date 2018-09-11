import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        Spotify.search.tracksArray
      ],//seachResults array
      playlistName: 'Jammming List',
      playlistTracks: [
        {
          'name': 'Track 1',
          'artist': 'Awesome Artist 1',
          'album': 'Awesome Album 1',
          'id': '1234567'
        },
        {
          'name': 'Track 2',
          'artist': 'Awesome Artist 2',
          'album': 'Awesome Album 2',
          'id': '8901234'
        },
        {
          'name': 'Track 3',
          'artist': 'Awesome Artist 3',
          'album': 'Awesome Album 3',
          'id': '5678901'
        }
      ]

    };//state

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatedPlaylistName = this.updatedPlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);


  }//end constructor

  addTrack(track) {
    this.state.playlistTracks.map(listTrack => {
      if(track.id !== listTrack.id) {//checks if the passed track is already in the array
        let addedAlready = false;//track is not in the array
      } else {
        let addedAlready = true;//track is already in the array
      }
    });

    if(!addedAlready){//if track is not in the array already, add it
      this.setState(playlistTracks.push(track));//adding on to end of the playlistTracks array
    }//end if
  }//end addTrack method

  removeTrack(removedtrack) {
    this.state.playlistTracks.find(removedTrack => {
      if(removedTrack.id === track.id){
        this.setState((removedTrack) => {
          playlistTracks.splice(removedTrack, 1);//is this how I use a method with setState syntax?
        });//end setState
      }//end if
    })//end find method
  }//end removeTrack method

  updatedPlaylistName(newName) {
    this.setState(newName => {
      playlistName: newName
    });
  }//end of updatedPlaylistName method

  savePlaylist() {
    let trackURIs = [];//new array to save uri’s into
    this.state.playlistTracks.map((track) => {
        trackURIs[track] = `spotify:track:${this.state.playlistTracks[track].id}`;
    });//iterate through playlistTrack and save each id into the new array

    //call the method defined in Spotify.js to save the playlist to the Spotify account
    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    //reset playlistName to 'New Playlist' and playlistTracks to an empty Array
    this.updatedPlaylistName('New Playlist');
    this.setState({
      playlistTracks: []//resetting to an empty array
    });
  }//end of App.savePlaylist method

  search(searchTerm) {
    console.log(searchTerm);
    Spotify.search(searchTerm);//passing the search term to the Spotify.search method
}//end search method: Accepts a search term and logs the term to the console

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatedPlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );//end return
  }//end render method
}//end App Component

export default App;
