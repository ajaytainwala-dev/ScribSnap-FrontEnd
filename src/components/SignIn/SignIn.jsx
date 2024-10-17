import * as React from "react";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../utils/AxiosInstance.js";
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
import { useNavigate,Link as RLink } from "react-router-dom";

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
      <Link color="inherit" href="/">
        ScribSnap
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const navigate = useNavigate();
  const myTheme = useContext(NoteContext);
  const auth = useContext(NoteContext);

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
      reset({ username: "", password: "" });
    }
    // eslint-disable-next-line
  }, [formState, submittedData, reset]);

  // Submit function
  const doSubmit = async (data) => {
    let finalData = JSON.stringify(data);
    // Sending the response to backend
    let logg = await auth.login(finalData);
    if (logg) {
      navigate("/dashboard");
    }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(doSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              {...register("username", {
                required: "Username is must!",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
              })}
            />
            {errors.username && (
              <span
                className="text-red-500 text-center "
                style={{ textAlign: "center", marginLeft: "5%" }}
              >
                {errors.username.message}
              </span>
            )}

            <FormControl sx={{ width: "100%" }} variant="filled">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                // sx={{ width: "100%" }}
                id="outlined-adornment-password"
                autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {isSubmitting ? (
              <Button
                disabled
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
            <ToastContainer />
            <Grid container>
              <Grid item xs>
                <RLink to="/forget">
                <Typography  variant="body2">
                  Forgot password?
                </Typography>
                </RLink>
              </Grid>
              <Grid item>
                <RLink to="/register" variant="body2">
                <Link variant="body2">
                  {"Don't have an account? Sign Up"}
                  </Link>
                </RLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
