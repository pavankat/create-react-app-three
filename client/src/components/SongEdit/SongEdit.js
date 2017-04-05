import React, { Component } from 'react';
import './SongEdit.css';
import songService from '../../lib/songService';

class SongEdit extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      title: ''
    };
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSongUpdate = this.handleSongUpdate.bind(this);
  }
  // Updates the components state based on the form input. More detailed explanation in SongForm.js
  handleFormInput(event, type) {
    const newState = Object.assign({}, this.state);
    newState[type] = event.target.value;
    this.setState(newState);
  }
  // fires when the update button is pressed. Creates a new object, based off state with the updated properties
  // Updates the song in the db, fetches all songs from the db again and updates the page. Then hides the edit component
  handleSongUpdate(song) {
    const updatedSong = Object.assign({}, song, this.state);
    songService
      .updateSong(updatedSong)
      .then(() => {
        this.props.loadSongs()
        this.props.toggleEdit();
      });
  }
  // Setting the intial value of the formInputs to the current artist and song names
  render() {
    return (
      <form onSubmit={event => event.preventDefault()} className="song-edit">
        <div className="form-group">
          <input
            onChange={event => this.handleFormInput(event, 'artist')}
            value={this.state.artist || this.props.song.artist}
            placeholder="Artist Name"
            type="text"
            className="form-control"
          />
          <input
            onChange={event => this.handleFormInput(event, 'title')}
            value={this.state.title || this.props.song.title}
            placeholder="Title"
            type="text"
            className="form-control"
          />
          <a
            onClick={() => this.handleSongUpdate(this.props.song)}
            type="submit"
            className="btn btn-success"
          >
            Update
          </a>
          <a
            onClick={this.props.toggleEdit}
            type="submit"
            className="btn btn-danger"
          >
            Cancel
          </a>
        </div>
      </form>
    );
  }
}

export default SongEdit;
