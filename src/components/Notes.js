import React, { useEffect, useContext, useRef ,useState} from "react";
import contextvalue from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let history=useNavigate();
  const context = useContext(contextvalue);
  const { notes, getnotes ,editnote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getnotes();
    }
    else{
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

   const [note, setnote] = useState({
    id:"",
      etitle: "",
      edescription: "",
      etag: "",
    });
     const updateNote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };
  const handleclick = (e) => {
    e.preventDefault(); 
    editnote(note.id,note.etitle,note.edescription,note.etag);
    props.showalert("Note altered successfully","success");
    refclose.current.click();// Prevent the defasult form submission behavior
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refclose=useRef(null);
  return (
    <>
      <Addnote showalert={props.showalert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle" value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription" value={note.edescription}
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="etag">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag" value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary">
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1>your notes</h1>
        <div className="conatiner">
        {notes.length===0 && 'no notes to display'}
        </div>
        <div className="row">
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} showalert={props.showalert} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Notes;
