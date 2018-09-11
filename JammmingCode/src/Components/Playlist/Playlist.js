import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList';

class Playlist extends Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }//end constructor

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
    //passing the input to props which will pass the target value to updatedPlaylistName and update the state
  }//end event handler, handleNameChange

  render() {
    return(
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );//end return statement
  }//end render method
}//end SearchResults component

export default Playlist;
