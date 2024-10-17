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

export default function ForgetPassword() {
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
      reset({ email: "" });
    }
    // eslint-disable-next-line
  }, [formState, submittedData, reset]);

  // Submit function
  const doSubmit = async (data) => {
    let finalData = JSON.stringify(data);
    // Sending the response to backend
    let logg = await auth.forgetUser(finalData);
   
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
            Forget Password
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "email is must!",
                minLength: {
                  value: 5,
                  message: "email must be at least 5 characters",
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

           
            {isSubmitting ? (
              <Button
                disabled
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            )}
            <ToastContainer />
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
