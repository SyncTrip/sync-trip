import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: '5rem',
  },
  pantalla1: {
    marginTop: "0",   
    color: "black",
    maxWidth: "40rem",  
    width: "100%",
    marginBottom: "2rem",
    textAlign: "center", 
    display: "block",      
    fontSize: "1.5rem",
  },
  textInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    marginTop: '2rem',

  },
  input: {
    width: "100%",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  buttonJoin: {
    marginTop: "2rem",
    display: "flex",
    height: "56px",
    width: "20rem",
    borderRadius: "30px",
    fontSize: "14px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
};

const Startpoint = ({ increase }) => {
  const navigate = useNavigate();
  const [text, setText] = useState(""); 

  const handleInput = () => {
    increase((prev) => prev + 1);
  };

  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        Where does your journey into the unknown begins? 
      </Typography>
      <Box style={styles.textInput}>
        <TextField
          style={styles.input}
          variant="outlined"
          placeholder="Where will your adventure begin?"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => {
            if (text) handleInput();
          }}
          disabled={text.trim() === ""}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Startpoint;
