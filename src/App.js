import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth";

import AddProject from "./components/AddProject";
// import ProjectList from "./components/ProectList";
import AddTask from "./components/AddTask";

import Registration from "./pages/Registration";
import Navbar from "./components/Navbar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const [isUser, setIsUser] = useState(false);
  const [owner, setOwner]= useState('')
  // const auth = getAuth();

  useEffect(() => {
    const auth = getAuth();

    const userCheck = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          setIsUser(true);
          setOwner(user.email)
          console.log(user.email)
          // ...
        } else {
          // User is signed out
          // ...
          setIsUser(false);
        }
      });
    };

    userCheck();
    return () => {
      userCheck();
    };
  }, []);

  return (
    <div className="App">
      

      <BrowserRouter>
      <Navbar user={isUser} />
        <Routes>
          <Route path="/" element={isUser? <AddProject owner={owner}/>:<Login/>} />
          <Route path="/home" element={ isUser? <AddProject owner={owner}/>:<Login/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path='/project/:id' element={<AddTask />} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/nav" element={<Navbar/>} /> */}
        </Routes>
      </BrowserRouter>
      {/* {!isUser && <Login />} */}
      {/* {isUser && (  */}
        
        {/* <>
        
          <p>User Sign in</p>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            Sign out
          </button>
      
          <AddProject />
          
        </>
      )} */}
    
    </div>
  );
}

export default App;
