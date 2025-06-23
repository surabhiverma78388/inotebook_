const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route 1:get all notes using GET "/api/notes/fetchallnotes".login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 2:add notes post "/api/notes/add note".login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//route 3: update existing note using put  "/api/notes/updatenote".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
const { title, description, tag } = req.body;
//create new note object
const newNote = {};
if (title) {
  newNote.title = title;
}
if (description) {
  newNote.description = description;
} 
if (tag) {
  newNote.tag = tag;
}
//find note to be updated and update it\
var note=await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found");}
if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");}

  note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json({note});
});



//route 4: delelte existing note using delete  "/api/notes/deletenote".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

//find note to be delete and delelte it
let note=await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found");}
//allow deletion only if user owns the note
if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");}

  note=await Notes.findByIdAndDelete(req.params.id);
  res.json({"success":"Note has been deleted",note:note});
});
module.exports = router;
