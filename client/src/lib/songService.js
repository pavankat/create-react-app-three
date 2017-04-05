// All song AJAX requests will start with /songs
const BASEURL = '/songs';

// Storing the headers in a variable since we use them more than once
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Exporting an object containing all of the methods we will use to communicate with the database
export default {
  loadSongs: function() {
    return fetch(BASEURL)
      .then(res => res.json());
  },
  getSong: function(id) {
    return fetch(`${BASEURL}/${id}`)
      .then(res => res.json());
  },
  createSong: function(song) {
    return fetch(BASEURL, {
      method: 'POST',
      body: JSON.stringify(song),
      headers,
    }).then(res => res.json());
  },
  updateSong: function(song) {
    return fetch(`${BASEURL}/${song._id}`, {
      method: 'PUT',
      body: JSON.stringify(song),
      headers,
    }).then(res => res.json());
  },
  destroySong: function(id) {
    return fetch(`${BASEURL}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
  }
} 
