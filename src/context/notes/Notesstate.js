import Notecontext from "./Notecontext";
import React, { useState } from "react";
const Notestate = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  //get all notes
   const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":localStorage.getItem('token')
        },
    });
    const json=await response.json();
    console.log(json);
    setnotes(json);
  };
  // Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":localStorage.getItem('token')
          },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("adding new note");
   
    const json = await response.json();
    setnotes(notes.concat(json));
  };
  //delete a note
  const deleteNote = async(id) => { 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {

      method: "DELETE",
      headers: {
        "content-type": "application/json",
      "auth-token":localStorage.getItem('token') 
       }
    });


    const newnotes = notes.filter((note) => {
      return note._id !== id;
        
    });
  setnotes(newnotes);
  };
  //edit a note

  const editnote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      "auth-token":localStorage.getItem('token')
     },
      body: JSON.stringify({ title, description, tag }),
    });
    

    let newnotes=JSON.parse(JSON.stringify(notes))
//logic to edit in client side
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
         break;
      }
     
    }
    setnotes(newnotes)
  };

  return (
    <Notecontext.Provider value={{ notes, addnote, deleteNote, editnote,getnotes }}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default Notestate;
