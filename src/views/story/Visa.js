import React, { use, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { Room } from "../../types/room";
import userCtrl from "../../domain/controllers/userCtrl";
import historyCtrl from "../../domain/controllers/historyCtrl"
import { HistoryContext } from "../../context/historyContext";
import { UserContext } from "../../context/userContext";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    color: "black",
    alignItems: "center",
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
};

const VisaView = ({ increase }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { history, setHistory } = useContext(HistoryContext);

  const handleInput = async (nationalValue) => {
    try {
        const userIndex = history.members.findIndex(
            (member) => member.id === currentUser.id
        );
        console.log('Index', userIndex);
        console.log('HistoryRoom', history.room)
        const updatedHistory = await historyCtrl.getHistory(history.room);
        console.log('OldHistory', updatedHistory)

        let national = updatedHistory.national || [];
        if (!Array.isArray(national)) {
            national = [];
        }
        national[userIndex] = nationalValue;

        const newHistory = await historyCtrl.updateHistory(history.room, { national });
        setHistory(newHistory);

        increase((prev) => prev + 1);
    } catch (error) {
        console.error("Error updating history:", error);
    }
};
  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        Are your credentials strong enough to cross the glove?
      </Typography>
      <Box style={styles.textInput}>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => {
            handleInput(false);
          }}
        >
          Yes, ready to cross any border
        </Button>
        <br></br>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => {
            handleInput(true);
          }}
        >
          Those with only ID are just fine
        </Button>
      </Box>
    </Box>
  );
};
export default VisaView;
