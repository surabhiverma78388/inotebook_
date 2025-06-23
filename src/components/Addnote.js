import contextvalue from "../context/notes/Notecontext";
import React, { useContext, useState } from "react";
const Addnote = (props) => {
  const context = useContext(contextvalue);
  const { addnote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleclick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    addnote(note.title, note.description, note.tag);
    setnote({title:"",description:"",tag:""});
    props.showalert("Note added successfully","success");
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3 mt-5">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title" value={note.title}
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description" value={note.description}
            name="description"
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="tag">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag" value={note.tag}
            name="tag"
            onChange={onChange}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
          Add note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
