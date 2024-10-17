import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NoteContext from "./Context";
import AxiosInstance from "../utils/AxiosInstance.js";
import { ToastContainer, toast } from "react-toastify";

const NoteState = (props) => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  let isLoggedIn = false;
  const signUp = async (data) => {
    try {
      let finalData = JSON.stringify(data);
      // Sending the response to backend
      const response = await AxiosInstance.post(
        "/api/auth/createuser",
        finalData
      );

      // Checking the response and setting authToken in local storage
      if (response.data && response.data.authToken) {
        let token = response.data.authToken;
        localStorage.setItem("auth-token", token);
      }

      // Checking the response and showing the toast message
      if (response.data && response.data.success === true) {
        toast.success("User created successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return true;
    } catch (error) {
      // Checking the response and showing the toast message
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error with request", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const isLogIn = async () => {
    try {
      let token = localStorage.getItem("auth-token");
      if (token) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const login = async (data) => {
    try {
      //   let finalData = JSON.stringify(data);
      const response = await AxiosInstance.post("/api/auth/login", data);
      // Checking the response and setting authToken in local storage
      if (response.data && response.data.authToken) {
        let token = response.data.authToken;
        localStorage.setItem("auth-token", token);
      }

      // Checking the response and showing the toast message
      if (response.data && response.data.success === true) {
        isLoggedIn = true;
        toast.success("User Logged in successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUser();
        return true;
      }
    } catch (error) {
      isLoggedIn = false;
      // Checking the response and showing the toast message
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error with request", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const forgetUser = async (data) => {
    try {
      let response = await AxiosInstance.post("/api/auth/forgotpassword", data);
      if (response.data && response.data.success === true) {
        toast.success(response.data.message, {
          position: "center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return true;
    } catch (error) {
      toast.error("Error with request", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const ResetPass = async (data, id) => {
    try {
      let response = await AxiosInstance.put(
        `/api/auth/resetpassword/${id}`,
        data
      );
      if (response.data && response.data.success === true) {
        toast.success(response.data.message, {
          position: "center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return true;
    } catch (error) {
      toast.error("Error with request", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
  });
  const getUser = async () => {
    let response = await AxiosInstance.get("/api/auth/user", {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    // if (!isLoggedIn) {
    //   setUser({
    //     fname: "",
    //     lname: "",
    //     username: "",
    //     email: "",
    //   });
    // }
    if (response.data) {
      setUser({
        fname: response.data.fname,
        lname: response.data.lname,
        username: response.data.username,
        email: response.data.email,
      });
    }
    // console.log(response.fname)
  };

  const EditUser = async (data) => {
    try {
      let response = await AxiosInstance.patch("/api/auth/", data, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (response.data && response.data.success === true) {
        // isLoggedIn = true;
        toast.success("User details updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // isLoggedIn = false;
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error with request", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const deleteUser = async () => {
    try {
      let response = await AxiosInstance.delete("/api/auth/", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (response.data && response.data.success === true) {
        // isLoggedIn = true;
        toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.removeItem("auth-token");
      }
    } catch (error) {
      toast.error("Error with request", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [searchNote,setSearchNote]=useState([]);

  const searchNotes = async (data) => {
    try {
      let response = await AxiosInstance.get("/api/note/search", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        params: {
          query: data,
        },
      });
      if (response.data && response.data.success === true) {
        setSearchNote(response.data.notes)
        // console.log(searchNote)
        console.log(response.data.notes)

      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error with request", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const notesInitial = [];
  const [note, setNote] = useState(notesInitial);

  const fetchNotes = async () => {
    try {
      let response = await AxiosInstance.get("/api/note/", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (response.data && response.data.success === true) {
        setNote(response.data.notes);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error with request", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const addNote = async (data) => {
    try {
      const response = await AxiosInstance.post("/api/note/", data, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      // // if(response.data && response.data.success === true ){
      await fetchNotes();
      // }
      // handle response
    } catch (error) {
      // handle error
    }
  };

  const EditNote = async (id,data) => {
    const noteID = id;
    try {
      const response = await AxiosInstance.put(`/api/note/${noteID}`,data,{
        headers:{
          "auth-token": localStorage.getItem("auth-token")
        }
      })
      await fetchNotes();
    } catch (error) {
      
    }
  };

  const deleteNotes = async (data) => {
    try {
      const response = await AxiosInstance.delete(`/api/note/${data}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (response.data && response.data.success === true) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchNotes();
      }
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const togglePinNote =  async (id,data)=>{
    let notOfPin = data;
    try{
      const response = await AxiosInstance.post(`/api/notes/pin/${id}`,{"isPinned":notOfPin},{
        headers:{
          "auth-token":localStorage.getItem("auth-token"),
          }
          });
          // if(response.data && response.data.success === true){
        }
        catch(error){

        }

  }
  
  const [search,setSearch]=useState(false);
const[ searchValue,setSearchValue]=useState("");
  return (
    <NoteContext.Provider
      value={{
        theme,
        handleThemeChange,
        signUp,
        isLogIn,
        login,
        forgetUser,
        ResetPass,
        user,
        getUser,
        EditUser,
        searchNotes,
        searchNote,
        deleteUser,
        fetchNotes,
        EditNote,
        addNote,
        deleteNotes,
        note,
        search,
        setSearch,
        searchValue,
        setSearchValue,
        togglePinNote
      }}
    >
      <ThemeProvider theme={muiTheme}>{props.children}</ThemeProvider>
    </NoteContext.Provider>
  );
};

export default NoteState;
