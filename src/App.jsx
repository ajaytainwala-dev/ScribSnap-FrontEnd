import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoadingBar from "react-top-loading-bar";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignIn/SignIn";
import Box from "@mui/material/Box";
import Profile from "./components/Profile/Profile";
import DashBoard from "./components/DashBoard/DashBoard";
import ForgetPassword from "./components/Passwords/ForgetPassword";
import ResetPassword from "./components/Passwords/ResetPassword";
import Footer from "./components/Footer/Footer";
import NoteState from "./Context/AllContext";
import "./App.css";
import "./index.css";
import React,{useState} from "react";

export default function App() {
// const [progress,setProgress]=useState(0);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NoteState>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <LoadingBar
              color="#f11946"
              progress={10}
              // onLoaderFinished={() => setProgress(0)}
            /> */}
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/forget" element={<ForgetPassword />} />
              <Route exact path="/register" element={<SignUp />} />
              <Route exact path="/dashboard" element={<DashBoard />} />
              <Route exact path="/profile/:id" element={<Profile />} />
              <Route exact path="/reset/:id" element={<ResetPassword />} />
              {/* <Route path="/admin" element={Admin} /> */}
              {/* <Route path="/add" element={Add} /> */}
              {/* <Route path="/edit/:id" element={Edit} /> */}
              {/* <Route path="/details/:id" element={Details} />  */}
            </Routes>
            <Footer/>
          </Box>
        </NoteState>
      </BrowserRouter>
    </React.Fragment>
  );
}
