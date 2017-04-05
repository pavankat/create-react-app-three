import React, { Component } from 'react';
import './SongForm.css';
import songService from '../../lib/songService';

class SongForm extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      title: ''
    };
    // Bind the custom methods who's `this` will change when passed as a prop
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleFormInput(event, type) {
    // Whenever something is typed in an input box, create an entirely new state object based on the current state
    // Set the updated property on the newState object, replace state with the newState
    const newState = Object.assign({}, this.state);
    newState[type] = event.target.value;
    this.setState(newState);
  }
  // When the Save button is pressed, create a new song from state, update the songsList, clear the form inputs
  handleButtonPress() {
    songService
      .createSong(this.state)
      .then(() => {
        this.props.loadSongs();
        this.setState({ artist: '', title: '' });
      });
  }

  // preventing a default form submission since we don't want the form to submit on "Enter"
  // Using arrow function callbacks to pass arguments
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={event => event.preventDefault()} className="song-form">
            <div className="form-group">
              <input onChange={event => this.handleFormInput(event,'artist')} value={this.state.artist} placeholder="Artist Name" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={event => this.handleFormInput(event, 'title')} value={this.state.title}   placeholder="Title" type="text" className="form-control" />
            </div>
            <button onClick={this.handleButtonPress} type="submit" className="btn btn-primary">Save</button>
          </form> 
        </div>  
      </div>
    );
  }
}

export default SongForm;
