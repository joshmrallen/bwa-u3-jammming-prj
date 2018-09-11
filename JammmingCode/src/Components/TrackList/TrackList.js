import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends Component {
  render() {
    return(
      <div className="TrackList">
        <ul>
          {//a map method that renders a set of Track components
            this.props.tracks.map(() => {
              return (
                <li>
                  <Track track={this.props.tracks} key={this.props.tracks.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
                </li>
              );//end map() return statement
            })//end map -- didn't need a semicolon here
          }
        </ul>
      </div>
    );//end return statement
  }//end render method
}//end TrackList component

export default TrackList;
