import React, { Component } from 'react';
import SongListItem from '../SongListItem';
import SongForm from '../SongForm';
import songService from '../../lib/songService';
import './SongList.css';

// Song list contains both the list of songs and the SongForm
class SongList extends Component {
  constructor() {
    super();
    // Set songs intially to an empty array
    this.state = {
      songs: []
    };
    // Bind the methods we need to pass into other components that need to maintain `this`
    this.renderList = this.renderList.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.loadSongs = this.loadSongs.bind(this);
  }
  // componentDidMount is a React Life Cycle method which occurs after the initial render. This is the best place to perform AJAX requests to populate initial state
  componentDidMount() {
    this.loadSongs();
  }

  // loadSongs populates this.state.songs with songs from the db
  loadSongs() {
    songService
      .loadSongs()
      .then(songs => this.setState({ songs }));
  }
  // handleDeleteClick fires when the delete button is pressed, loadSongs is called once complete
  handleDeleteClick(id) {
    songService
      .destroySong(id)
      .then(this.loadSongs);
  }
  // handleEditClick fires when a song is updated, loadSongs is called once complete
  handleEditClick(song) {
    songService
      .updateSong(song)
      .then(this.loadSongs);
  }
  // renderList returns an array of SongListItem components, passed the methods and properties needed to function
  renderList() {
    return this.state.songs.map(song => {
      return (
        <SongListItem
          loadSongs={this.loadSongs}
          deleteSong={this.handleDeleteClick}
          editSong={this.handleEditClick}
          song={song}
          key={song._id}
        />
      );
    });
  }
  // Calling this.renderList() inside of the render method places the return value of that method in it's place
  render() {
    return (
      <div>
        <SongForm loadSongs={this.loadSongs} />
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <ul className="song-list list-group">
              {this.renderList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SongList;
