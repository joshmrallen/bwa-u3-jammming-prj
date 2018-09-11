import React from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction(this);

  }//end constructor

  addTrack() {
    this.props.onAdd(this.props.track);
  }//end addTrack method

  removeTrack() {
    this.props.onRemove(this.props.track);
  }//end removeTrack method

  renderAction() {
    let trackAction = '';

    if(this.props.isRemoval) {
      let trackAction = '-';
    } else {
      let trackAction = '+';
    }//end if

    return trackAction;

  }//end renderAction

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.addTrack} onClick={this.removeTrack}>{this.renderAction}</a>
      </div>
    );//end return
  }//end render method

}//end Track component

export default Track;
