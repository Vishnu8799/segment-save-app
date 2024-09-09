import React, { useState } from 'react';
import './App.css';
import Popup from './Popup';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App-header">
      <button className='button-style' onClick={togglePopup}>Save segment</button>
      {isOpen && (
        <Popup
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
