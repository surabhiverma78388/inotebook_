import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/notes/Notesstate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
function App() {
  const[alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },1500)
  }
  return (
   <>
  <Notestate>
    <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showalert={showalert}/>} />
          <Route exact path="/about" element={<About />} />
          <Route path="/login" element={<Login showalert={showalert}/>} />
          <Route path="/signup" element={<Signup showalert={showalert} />} />
        </Routes>
      </div>
    </Router>
  </Notestate>
</>
  );
}

export default App;
