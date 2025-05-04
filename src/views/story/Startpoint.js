import React, { useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Room } from "../../types/room";
import historyCtrl from "../../domain/controllers/historyCtrl";
import { UserContext } from "../../context/userContext";
import { HistoryContext } from "../../context/historyContext";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5rem",
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
    marginTop: "2rem",
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
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { history, setHistory } = useContext(HistoryContext);

  const handleInput = async () => {
    try {
      console.log("History mmbrs", history.members);
      const userIndex = history.members.findIndex(
        (member) => member.id === currentUser.id
      );

      if (userIndex === -1) {
        console.error("Error: Current user not found in history members");
        return;
      }

      console.log("Index", userIndex);
      console.log("HistoryRoom", history.room);
      const updatedHistory = await historyCtrl.getHistory(history.room);
      console.log("OldHistory", updatedHistory);

      let origen = updatedHistory?.origen || [];
      if (!Array.isArray(origen)) {
        origen = [];
      }

      origen[userIndex] = text;

      const newHistoryID = await historyCtrl.updateHistory(history.room, {
        origen,
      });
      const newHistory = await historyCtrl.getHistory(newHistoryID);
      setHistory(newHistory);
      console.log("Updated History in Context:", newHistory);

      // Increment the step
      increase((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating history:", error);
    }
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
