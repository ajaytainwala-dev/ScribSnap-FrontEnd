import React from "react";
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
import { useState, useContext, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TagInput from "./TagInput";
import MUIRichTextEditor from "mui-rte";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { EditNote } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height:"100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY:"auto",
};

const AddEditNote = ({
  id,
  type,
  EditTitle,
  editTag,
  EditDescription,
  open,
  handleClose,
}) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(editTag);

  const { addNote, EditNote } = useContext(NoteContext);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting, isSubmitSuccessful, submittedData },
  } = useForm();


  
  const doSubmit = (data) => {
    const Thisid = id;
    const finalData = {
      title: data.title,
      tag: type === "add" ? tags : tag,
      description: data.description,
    };
    if (type === "add") {
      addNote(finalData);
    } else if (type === "edit") {
      EditNote(Thisid, finalData);
    }
    handleClose();
  };

  const save=(data)=>{
    console.log(data);
    
  }
  return (
    <>
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ ...style, width: 400 }}>
            <Typography
              variant="h6"
              id="parent-modal-title"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Add a Note!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(doSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    autoComplete="title"
                    name="title"
                    required
                    fullWidth
                    defaultValue={type === "edit" ? EditTitle : ""}
                    id="title"
                    label="Title"
                    {...register("title", {
                      required: "Title is required!",
                      minLength: {
                        value: 2,
                        message: "Title must be at least 2 characters",
                      },
                    })}
                    autoFocus
                  />
                </Grid>

                {errors.title && (
                  <span
                    className="text-center text-red-500 "
                    style={{ textAlign: "center", marginLeft: "5%" }}
                  >
                    {errors.title.message}
                  </span>
                )}

                {type === "edit" ? (
                  <TagInput tags={tag} setTags={setTag} />
                ) : (
                  <TagInput tags={tags} setTags={setTags} />
                )}

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={6}
                    defaultValue={type === "edit" ? EditDescription : ""}
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    {...register("description", {
                      required: "Description is required!",
                      minLength: {
                        value: 2,
                        message: "Description must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.description && (
                    <span
                      className="text-center text-red-500 "
                      style={{ textAlign: "center", marginLeft: "5%" }}
                    >
                      {errors.description.message}
                    </span>
                  )}
                  {/* <MUIRichTextEditor
                    onSave={save}
                    inlineToolbar={true}
                    defaultValue={defValue}
                    label="Start typing..."
                  /> */}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{display:"flex",alignItems:{md:"row",xs:"column-reverse"}}}>
                <Grid item xs={12} md={6}>
                  <Button
                    color="error"
                    fullWidth
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ mt: 3, mb: 2, outlineColor: "red" }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  {isSubmitting ? (
                    <Button
                      disabled
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {type === "edit" ? "Edit" : "Add"}
                    </Button>
                  )}
                </Grid>
              </Grid>
              {/* <ToastContainer /> */}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditNote;
