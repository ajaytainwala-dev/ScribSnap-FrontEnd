import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Search from "../Search/Search";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import NoteCard from "../NoteCard/NoteCard.jsx";
import { ToastContainer, toast } from "react-toastify";
import NoteContext from "../../Context/Context.jsx";
// import AxiosInstance from "../utils/AxiosInstance.js";
import { IoMdAdd } from "react-icons/io";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Drawer from "./Drawer.jsx";
// import Drawer from '@mui/material/Drawer';
import AddEditNote from "../Inputs/AddEditNote";
import Masonry from "@mui/lab/Masonry";

export const Nothing = () => {
  const { searchNote, searchNotes, search, setSearchValue, searchValue } =
    useContext(NoteContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <section className="bg-white mt-1">
      <div className=" py-5 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="flex items-center flex-col">
          <img
            src="./Placeholder/Nothing.webp"
            alt="h"
            style={{ width: "300px", heigth: "300px" }}
            className="select-none"
          />
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center">
            {search
              ? `\"${searchValue}\" note not found !`
              : "Nothing to show here!!"}
          </h2>
          <p className="mb-8 text-center font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Add notes to see here
          </p>
          <div
            // className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            className="flex items-center justify-center"
          >
            <Button onClick={handleOpen} variant="contained">
              Add Note
            </Button>
            <AddEditNote type={"add"} open={open} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </section>
  );
};

const DashBoard = () => {
  const {
    fetchNotes,
    note,
    deleteNotes,
    searchNote,
    searchNotes,
    search,
    togglePinNote,
  } = useContext(NoteContext);
  useEffect(() => {
    fetchNotes();
    // {search&& fetchNotes()}
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    {/* <Drawer/> */}
      <div className="antialiased bg-gray-50">
    
        <main className="p-4
        
          h-auto ">
          <Box>
            <Box
              sx={{
                height: { xs: "auto", md: "10vh" },
                zIndex: "0",
                minheight: "10vh",
                p: "10px",
                m: "10px",
              }}
            >
              <Search />
            </Box>
            {search &&
              (searchNote.length === 0 ? (
                <Nothing />
              ) : (
                <div className="container p-6 mx-auto mt-2">
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      display: "block",
                      fontWeight: "bold",
                    }}
                  >
                    Your Searched Notes
                  </Typography>
                  <div
                    className="flex gap-5 mt-2 m-6auto p-"
                    style={{ justifyContent: "space-evenly", flexWrap: "wrap" }}
                  >
                    {searchNote.map((notes) => (
                      <NoteCard
                        key={notes._id}
                        id={notes._id}
                        title={notes.title}
                        tags={notes.tag}
                        description={notes.description}
                        date={notes.updatedAt}
                        isPinned={notes.isPinned}
                        onEdit={() => {}}
                        onDelete={() => {
                          deleteNotes(notes._id);
                        }}
                        onPinNote={togglePinNote(notes._id, !notes.isPinned)}
                      />
                    ))}
                  </div>
                  <ToastContainer />
                </div>
              ))}
            <Box>
              {note.length === 0 ? (
                <Nothing />
              ) : (
                <div className="container p-6 mx-auto mt-4">
                  {search && (
                    <Divider
                      sx={{ fontSize: "1rem", fontWeight: "bolder", m: "1rem" }}
                    >
                      <Chip label="All Notes" size="small" />
                    </Divider>
                  )}
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      display: "block",
                      fontWeight: "bold",
                    }}
                  >
                    Your Notes
                  </Typography>
                  <div
                    className="flex gap-5 mt-2 m-6 p-auto "
                    style={{ justifyContent: "space-evenly", flexWrap: "wrap" }}
                  >
                    {/* <Masonry columns={4} spacing={2} */}
                    {/* //  sx={{p:"10px"}}
                    //  > */}
                      {note.map((notes) => (
                        <NoteCard
                          key={notes._id}
                          id={notes._id}
                          title={notes.title}
                          tags={notes.tag}
                          description={notes.description}
                          date={notes.updatedAt}
                          isPinned={notes.isPinned}
                          onEdit={() => {}}
                          onDelete={() => {
                            deleteNotes(notes._id);
                          }}
                          onPinNote={() => {
                            togglePinNote(notes._id, !notes.isPinned);
                          }}
                        />
                      ))}
                    {/* </Masonry> */}
                  </div>
                  <ToastContainer />
                </div>
              )}

              {/* <AddEditNote type={"add"} /> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#1976D2",
                  height: "50px",
                  width: "50px",
                  position: "fixed",
                  bottom: "0",
                  borderRadius: "50%",
                  m: "1rem",
                  right: "0",
                  zIndex: "10",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.6)",
                }}
              >
                <IconButton sx={{ textALign: "center" }} onClick={handleOpen}>
                  <IoMdAdd style={{ color: "white", textAlign: "center" }} />
                </IconButton>
                <AddEditNote
                  type={"add"}
                  open={open}
                  handleClose={handleClose}
                />
              </Box>
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
};

export default DashBoard;
