import React, { useState } from "react";

const Note = () => {
  const [note, setNote] = useState(true);

  const handleclick = () => {
    setNote(false);
  };

  return (
    <>
      {note && (
        <div className="note_container">
          <p contentEditable="true">Add</p>
          <button onClick={handleclick}>X</button>
        </div>
      )}
    </>
  );
};

export default Note;
