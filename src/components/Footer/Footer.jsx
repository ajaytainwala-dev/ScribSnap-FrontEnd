// import * as React from 'react';
import { useState, useContext } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {Link as RLink} from 'react-router-dom';
import NoteContext from "../../Context/Context.jsx";

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      <RLink color="inherit" to={"/"}>
       Scrib Snap
      </RLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function StickyFooter() {
    const myTheme  = useContext(NoteContext);

const defaultTheme = createTheme({
  palette: {
    mode: myTheme.theme,
  },
});
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          // display: 'flex',
          // flexDirection: 'column',
          // minHeight: '20vh',
          // minWidth: '100%',
          position:"relative",
            bottom:0,
            zIndex:"5"
        }}
      >
        <CssBaseline />
       
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            bgcolor: "#1976D2",
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[200]
            //     : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
          <Link href="https://ajaytainwala-dev.github.io" target="_blank"> <Typography variant="body1" color="white">
             Designed and Developed by <span style={{textDecoration:"underline"}}>Ajay Tainwala</span>
            </Typography></Link>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}