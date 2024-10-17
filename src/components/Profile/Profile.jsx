import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NoteContext from "../../Context/Context.jsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import { useState, useContext, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import TEst from "../NavBar/TEst.jsx"

import { GiCancel } from "react-icons/gi";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Profile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting, isSubmitSuccessful, submittedData },
  } = useForm();

  const { id } = useParams();
  const myTheme = useContext(NoteContext);
  const profile = useContext(NoteContext);
  useEffect(() => {
    profile.getUser();
  }, []);

  const onClickEdit = () => {
    handleOpen();
    // profile.EditUser();
  };
  const delay = (n) => {
    setTimeout(() => {}, n * 1000);
  };
  const darkTheme = createTheme({
    palette: {
      mode: myTheme.theme,
    },
  });
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const doSubmit = async (data) => {
    let finalData = JSON.stringify(data);
    await profile.EditUser(finalData);
    await profile.getUser();
    handleClose();
  };
  const [details, setDetails] = useState({
    fname: profile.user.fname,
    lname: profile.user.lname,
    username: profile.user.username,
    email: profile.user.email,
  });

  const onChangeInput = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box
          sx={{
            height: { xs: "auto", md: "100vh" },
            zIndex: "0",
            px: "20px",
            pb: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minheight: "100vh",
            gap: "20px",
            // mt: { md: "0.5rem", xs: "4.5rem" },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            User Profile
          </Typography>
          <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow "
            style={{
              padding: "20px",
            }}
          >
            <div className="flex justify-end px-4 pt-4">
              <IconButton
                size="small"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={onClickEdit}
              >
                <MdEdit style={{ color: "black" }} />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400, borderRadius: "8px" }}>
                  <Typography
                    variant="h6"
                    id="parent-modal-title"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Edit User Details
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(doSubmit)}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={6} sm={6}>
                        <TextField
                          value={details.fname}
                          autoComplete="given-name"
                          name="fname"
                          required
                          fullWidth
                          id="fname"
                          label="First Name"
                          {...register("fname", {
                            required: "First Name is required!",
                            minLength: {
                              value: 2,
                              message:
                                "First name must be at least 2 characters",
                            },
                            // validate: (value) => (value.trim() !== '' || handleError("Please enter your first name")),
                          })}
                          autoFocus
                          // aria-invalid={errors.fname ? "true" : "false"}

                          onChange={onChangeInput}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lname"
                          label="Last Name"
                          name="lname"
                          autoComplete="family-name"
                          {...register("lname", {
                            required: "Last Name is required!",
                            minLength: {
                              value: 2,
                              message:
                                "Last name must be at least 2 characters",
                            },
                          })}
                          aria-invalid={errors.lname ? "true" : "false"}
                          value={details.lname}
                          onChange={onChangeInput}
                        />
                      </Grid>
                      {errors.fname && (
                        <span
                          className="text-red-500 text-center "
                          style={{ textAlign: "center", marginLeft: "5%" }}
                        >
                          {errors.fname.message}
                        </span>
                      )}
                      {errors.lname && (
                        <span
                          className="text-red-500 text-center"
                          style={{ textAlign: "center", marginLeft: "5%" }}
                        >
                          {errors.lname.message}
                        </span>
                      )}
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="User Name"
                          name="username"
                          autoComplete="username"
                          {...register("username", {
                            required: "Username is must!",
                            minLength: {
                              value: 5,
                              message: "Username must be at least 5 characters",
                            },
                          })}
                          aria-invalid={errors.username ? "true" : "false"}
                          value={details.username}
                          onChange={onChangeInput}
                        />
                        {errors.username && (
                          <span
                            className="text-red-500 text-center "
                            style={{ textAlign: "center", marginLeft: "5%" }}
                          >
                            {errors.username.message}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          {...register("email", {
                            required: "User E-mail is required!", // Shorthand for required message
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email format",
                            },
                          })}
                          value={details.email}
                          onChange={onChangeInput}
                        />
                        {errors.email && (
                          <span
                            className="text-red-500 text-center "
                            style={{ textAlign: "center", marginLeft: "5%" }}
                          >
                            {errors.email.message}
                          </span>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
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
                            Edit
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                    <ToastContainer />
                  </Box>
                </Box>
              </Modal>
              <IconButton
                size="small"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpen2}
              >
                <MdDelete style={{ color: "black" }} />
              </IconButton>
              <Modal
                keepMounted
                open={open2}
                onClose={handleClose2}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      my: "10px",
                    }}
                  >
                    <GiCancel
                      style={{ width: "50px", height: "50px", color: "red" }}
                    />
                  </Box>
                  <Typography
                    id="keep-mounted-modal-title"
                    sx={{ color: "red", textAlign: "center" }}
                    variant="h5"
                    component="h2"
                  >
                    Are you sure you want to delete your account?
                  </Typography>
                  <Typography
                    id="keep-mounted-modal-description"
                    sx={{ mt: 2, color: "slategray", textAlign: "center" }}
                  >
                    Your account will be deleted permanently and you will not be
                    able to recover it. All your notes will be deleted as well.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Button
                        color="primary"
                        fullWidth
                        variant="outlined"
                        onClick={handleClose2}
                        sx={{
                          mt: 3,
                          mb: 2,
                          outlineColor: "red",
                          "&:hover": {
                            backgroundColor: "mediumblue",
                            color: "white",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        color="error"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                          profile.deleteUser();
                          handleClose2(), delay(2), navigate("/");
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </div>
            <div className="flex flex-col items-center pb-10">
              <Tooltip title="Profile Picture">
                <Avatar
                  sx={{ width: "2rem", height: "2rem" }}
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  {...stringAvatar(
                    `${profile.user.fname} ${profile.user.lname}`
                  )}
                />
              </Tooltip>
              <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                Hello, {profile.user.fname} {profile.user.lname}
              </h5>
              <span className="text-sm text-gray-500 ">
                {profile.user.username}
              </span>
              <span className="text-sm text-gray-500 ">
                {profile.user.email}
              </span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  View Notes
                </Link>
              </div>
            </div>
          </div>
          {/* </Container> */}
        </Box>
      </ThemeProvider>
    </>
  );
};
export default Profile;
