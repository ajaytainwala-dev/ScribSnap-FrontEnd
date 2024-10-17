import React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import NoteContext from "../../Context/Context.jsx";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
// import { useState, useContext, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import AddEditNote from "../Inputs/AddEditNote";
import NoteCard from "../NoteCard/NoteCard.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = () => {
  const {
    search,
    setSearch,
    searchNotes,
    searchNote,
    deleteNotes,
    fetchNotes,
    note,
    setSearchValue,
  } = useContext(NoteContext);
  // const [search,setSearch]=useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting, isSubmitSuccessful, submittedData },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSearch(true);
    searchNotes(data.Search);
    setSearchValue(data.Search);
    reset();
  };

  const doSubmit = async (data) => {
    handleClose();
  };

  const onClose = () => {
    setSearch(false);
    fetchNotes();
  };

  return (
    <>
      {note.length === 0 ? (
        <></>
      ) : (
        <div
          style={{
            position: "sticky",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <form
              className="flex items-center max-w-sm mx-4 gap-2"
              style={{
                width: "100%",
                padding: "8px",
                background: "rgba( 209, 209, 209, 0.25 )",
                boxShadow: "0 3px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 3.5px )",
                WebkitBackdropFilter: "blur( 3.5px )",
                borderRadius: "10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full ">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  {/* <IoMdClose/> */}
                </div>
                <input
                  type="text"
                  id="Search"
                  className="bg-gray-50 border-2 border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="Search Notes,Title,..."
                  required
                  {...register("Search", {
                    required: "Empty search not allowed",
                  })}
                />
              </div>
              {search === true && (
                <button
                  className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  onClick={() => onClose()}
                >
                  <IoMdClose style={{ fontSize: "1rem" }} />
                  <span className="sr-only">Close</span>
                </button>
              )}
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
            <Button onClick={handleOpen} variant="contained" className="m-8">
              Add Note
            </Button>
            <AddEditNote type={"add"} open={open} handleClose={handleClose} />
          </Box>
        </div>
      )}
    </>
  );
};

export default Search;
