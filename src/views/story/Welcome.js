import React, { use, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { Room } from "../../types/room";
import roomCtrl from "../../domain/controllers/roomCtrl";

const styles = {
  root: {
    padding: "3rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  pantalla1: {
    fontSize: "1.5rem",
    marginTop: "6rem",
    color: "black",
    maxWidth: "100%",
    width: "50%",
    marginBottom: "4rem",
  },
  buttonaccept: {
    display: "flex",
    height: "64px",
    minWidth: "300px",
    borderRadius: "30px",
    fontSize: "20px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonexit: {
    marginTop: '1rem',
    color: 'black',                
    background: 'none',            
    border: 'none',                
    textDecoration: 'underline',   
    fontSize: '1.5rem',              
    cursor: 'pointer',             
    padding: '8px 16px',           
    outline: 'none',               
    display: 'inline',
  }
};

const WelcomeView = ({ increase }) => {
    const navigate = useNavigate();
  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        Welcome, Chosen Ones. You are the last hope to discover the secret lost
        adventure in a mysterious place. Only the bravest and most synchronized
        travelers will be able to complete the mission. Do you accept the
        challenge?
      </Typography>
      <Box style={styles.buttons}>
        <Button
          onClick={() => increase((prev) => prev + 1)}
          style={styles.buttonaccept}
        >
          Accept mission
        </Button>
        <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button style={styles.buttonexit}
        onClick={() => navigate('/session', {state:{type: 'index'}})}> Exit </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomeView;
