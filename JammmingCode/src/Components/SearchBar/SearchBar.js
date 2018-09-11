import React from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }//end constructor

  handleTermChange(e) {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm
    });
  }//end handleTermChange

  search() {
    this.props.onSearch(this.state.searchTerm);
  }//end SearchBar's search method

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a>SEARCH</a>
      </div>
    );//end return statement
  }//end render method
}//end SeachBar component

export default SearchBar;
