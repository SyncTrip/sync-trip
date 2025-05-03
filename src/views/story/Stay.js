import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const styles = {
  root: {
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    background: "white",
  },
  pantalla1: {
    marginTop: "0",   
    color: "black",
    maxWidth: "30rem",  
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

const StayView = ({ increase }) => {
  const navigate = useNavigate();
  const [days, setDays] = useState(0); 

  const handleInput = () => {
    increase((prev) => prev + 1);
  };

  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        The secret is only revealed to those who know how to manage their time. How much time can you dedicate to the search?      </Typography>
      <Box style={styles.textInput}>
        <TextField
          style={styles.input}
          variant="outlined"
          placeholder="Stay in days"
          onChange={(e) => setDays(e.target.value)}

        />
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => {
            if (days && !isNaN(days) && Number.isInteger(Number(days)) && days > 0 && days < 120) {
              handleInput();
            } else {
              alert("Please enter a valid number of days");
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default StayView;
