import React, { Component } from 'react';
import './SongListItem.css';
import SongEdit from '../SongEdit';

class SongListItem extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  // Toggle edit simply toggles this.state.edit to true to false
  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }
  // songOrEdit either returns a SongEdit component, or the result of the renderSong method
  songOrEdit() {
    if (!this.state.edit) {
      return this.renderSong();
    }
    return (
      <SongEdit toggleEdit={this.toggleEdit} loadSongs={this.props.loadSongs} song={this.props.song} />
    );
  }
  // renderSong returns a list-item containing data about the song and options to delete or edit it
  renderSong() {
    return (
      <li className="song-list list-group-item">
        <span className="delete" onClick={() => this.props.deleteSong(this.props.song._id)}>✖ </span>
        <span>Artist: {this.props.song.artist} </span>
        <span>Song: {this.props.song.title} </span>
        <span className="edit" onClick={() => this.toggleEdit(this.props.song)}> Edit</span>
      </li>
    );
  }
  // Let songOrEdit decide what gets rendered. The benefit of outsourcing this logic to seperate methods is we keep render clear and easier to debug if any issues occur
  render() {
    return this.songOrEdit();
  }
}

export default SongListItem;
