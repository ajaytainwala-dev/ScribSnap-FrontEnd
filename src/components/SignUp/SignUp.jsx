import * as React from "react";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NoteContext from "../../Context/Context.jsx";
import { Link,useNavigate } from "react-router-dom";

// Copyright Component
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        ScribSnap
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const navigate = useNavigate();

  const myTheme = useContext(NoteContext);
  const signUp = useContext(NoteContext);

  const defaultTheme = createTheme({
    palette: {
      mode: myTheme.theme,
    },
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting, isSubmitSuccessful, submittedData },
  } = useForm();

  //  Using React Hook Form to reset the form after successful submission
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ fname: "", lname: "", username: "", email: "", password: "" });
    }
  }, [formState, submittedData, reset]);

  // Submit function
  const doSubmit = async (data) => {
  let sign = await signUp.signUp(data);
  if(sign){
    navigate("/dashboard")
  }
    // try {
    //   let finalData = JSON.stringify(data);
    //   // Sending the response to backend
    //   const response = await AxiosInstance.post(
    //     "/api/auth/createuser",
    //     finalData
    //   );

    //   // Checking the response and setting authToken in local storage
    //   if (response.data && response.data.authToken) {
    //     let token = response.data.authToken;
    //     localStorage.setItem("auth-token", token);
    //   }

    //   // Checking the response and showing the toast message
    //   if (response.data && response.data.success === true) {
    //     toast.success("User created successfully", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   }
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(error.response.data.message);
    //   // Checking the response and showing the toast message
    //   if (
    //     error.response &&
    //     error.response.data &&
    //     error.response.data.success === false
    //   ) {
    //     toast.error(error.response.data.message, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   } else {
    //     toast.error("Error with request", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   }
    // }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(doSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
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
                      message: "First name must be at least 2 characters",
                    },
                    // validate: (value) => (value.trim() !== '' || handleError("Please enter your first name")),
                  })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                  aria-invalid={errors.lname ? "true" : "false"}
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

              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    // sx={{ width: "100%" }}
                    id="outlined-adornment-password"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true, // Shorthand for required message
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {errors.password && (
                  <span
                    className="text-red-500 text-center "
                    style={{ textAlign: "center", marginLeft: "5%" }}
                  >
                    {errors.password.message}
                  </span>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            {isSubmitting ? (
              <Button
                disabled
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <ToastContainer />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
