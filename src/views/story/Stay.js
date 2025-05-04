import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import historyCtrl from "../../domain/controllers/historyCtrl";
import { UserContext } from "../../context/userContext";
import { HistoryContext } from "../../context/historyContext";

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

const handleInput = async (texto, currentUser, history, setHistory, increase) => {
  try {
    console.log("History members:", history.members);

    // Find the index of the current user in the members array
    const userIndex = history.members.findIndex(
      (member) => member.id === currentUser.id
    );

    if (userIndex === -1) {
      console.error("Error: Current user not found in history members");
      return;
    }

    console.log("Index:", userIndex);
    console.log("HistoryRoom:", history.room);

    // Fetch the latest history from the database
    const updatedHistory = await historyCtrl.getHistory(history.room);
    console.log("OldHistory:", updatedHistory);

    let durada = updatedHistory?.durada || [];
    if (!Array.isArray(durada)) {
      durada = [];
    }

    // Update the durada array for the current user
    durada[userIndex] = texto;

    // Update the history in the database
    const newHistoryID = await historyCtrl.updateHistory(history.room, { durada });
    const newHistory = await historyCtrl.getHistory(newHistoryID);
    setHistory(newHistory);
    console.log("Updated History in Context:", newHistory);

    // Increment the step
    increase((prev) => prev + 1);
  } catch (error) {
    console.error("Error updating history:", error);
  }
};

const StayView = ({ increase }) => {
  const navigate = useNavigate();
  const [days, setDays] = useState(0);
  const { currentUser } = useContext(UserContext);
  const { history, setHistory } = useContext(HistoryContext);

  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        The secret is only revealed to those who know how to manage their time.
        How much time can you dedicate to the search?
      </Typography>
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
            if (
              days &&
              !isNaN(days) &&
              Number.isInteger(Number(days)) &&
              days > 0 &&
              days < 120
            ) {
              handleInput(days, currentUser, history, setHistory, increase);
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