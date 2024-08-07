import React, { useState } from 'react';
import './App.css';
import Note from './Note';

function App() {
  const [notes, setNotes] = useState([]);
//Passsing the component as an array element
  const handleAddNote = () => {
    setNotes([...notes, <Note key={notes.length} />]);
  };

  return (
    <>
      <h1>Note App</h1>
      <button onClick={handleAddNote}>Add Note</button>
      {notes}
    </>
  );
}

export default App;
