import React, { Component } from 'react';
import CenterContainer from './containers/CenterContainer';
import SongList from './components/SongList';
import './App.css';

// Rendering SongList inside of CenterContainer
// CenterContainer is just a bootstrap container with centered text
class App extends Component {
  render() {
    return (
    <CenterContainer>
      <SongList />  
    </CenterContainer>
    );
  }
}

export default App;
