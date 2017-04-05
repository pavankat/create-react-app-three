import React from 'react';
import './CenterContainer.css';

// Any components passed inside of other components are available as props.children
// Songlist is the component being rendered
function CenterContainer(props) {
  return (
    <div className="center-container container text-center">
      <h1>The React Songs App</h1>
      {props.children}
    </div>
  );
}

export default CenterContainer;
