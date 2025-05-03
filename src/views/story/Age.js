import React, { use, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { Room } from "../../types/room";
import userCtrl from "../../domain/controllers/userCtrl";
import { UserContext } from "../../context/userContext";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    color: "black",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pantalla1: {
    marginTop: "5rem",
    color: "black",
    maxWidth: "100%",
    width: "50%",
    display: "flex",
    alignItems: " center",
    marginBottom: "4rem",
    justifyContent: "center",
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
  textInput: {
    display: " flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
    gap: "20px",
    width: "100%",
    marginBottom: "2rem",
  },
  input: {
    width: "20%",
    padding: "10px", // Ajusta según lo necesites
    fontSize: "1rem", // Ajusta el tamaño de fuente si es muy grande
  },
};

const AgeView = ({ increase }) => {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleInputAge = () => {
    if (currentUser) {
      console.log("Age:", age);
      console.log("User ID:", currentUser.id);
      userCtrl
        .updateUser(currentUser.id, { age: age })
        .then(() => {
          increase((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      console.error("User not found in context"); 
    }
  };

  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        Which is your age adventurer?
      </Typography>
      <Box style={styles.textInput}>
        <TextField
          style={styles.input}
          variant="outlined"
          placeholder="Enter your age here"
          onChange={(e) => setAge(e.target.value)}
        />
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => {
            if (
              age &&
              !isNaN(age) &&
              Number.isInteger(Number(age)) &&
              age > 0 &&
              age < 120 &&
              !/^0x/i.test(age) &&
              !/^[01]+$/.test(age)
            ) {
              handleInputAge();
            } else {
              alert("Please enter a valid number for age.");
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default AgeView;
