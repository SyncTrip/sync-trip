import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../theme";
import { UserContext } from "../../context/userContext";
import { HistoryContext } from "../../context/historyContext";
import historyCtrl from "../../domain/controllers/historyCtrl";

const styles = {
  root: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    background: "white",
  },
  pantalla1: {
    fontSize: "1.5rem",
    color: "black",
    textAlign: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  buttonGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
    width: "100%",
    maxWidth: "900px",
  },
  buttonJoin: {
    marginTop: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: "20rem",
    borderRadius: "30px",
    fontSize: "14px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    boxSizing: "border-box",
    padding: "24px 20px",
    textAlign: "center",
    gap: "8px",
  },
};

const handleInput = async (
  texto,
  currentUser,
  history,
  setHistory,
  increase
) => {
  try {
    console.log("History members:", history.members);
    const userIndex = history.members.findIndex(
      (member) => member.id === currentUser.id
    );

    if (userIndex === -1) {
      console.error("Error: Current user not found in history members");
      return;
    }

    console.log("Index:", userIndex);
    console.log("HistoryRoom:", history.room);

    const updatedHistory = await historyCtrl.getHistory(history.room);
    console.log("OldHistory:", updatedHistory);

    let activitats = updatedHistory?.activitats || [];
    if (!Array.isArray(activitats)) {
      activitats = [];
    }

    activitats[userIndex] = texto;

    const newHistoryID = await historyCtrl.updateHistory(history.room, {
      activitats,
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

const ActivitiesView = ({ increase }) => {
  const { currentUser } = useContext(UserContext);
  const { history, setHistory } = useContext(HistoryContext);

  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        The path to the destination is paved with trials. What kinds of
        activities motivate you the most to solve the mystery?
      </Typography>
      <Box style={styles.buttonGrid}>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() =>
            handleInput("Culture", currentUser, history, setHistory, increase)
          }
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
            Culture and city
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Following clues in museums, markets, monuments...
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() =>
            handleInput(
              "Extreme adventure",
              currentUser,
              history,
              setHistory,
              increase
            )
          }
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
            Extreme adventure
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Exploring caves, climbing, searching for hidden treasures...
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() =>
            handleInput("Chill out", currentUser, history, setHistory, increase)
          }
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
            Chill out
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Solving puzzles on the beach, relaxing while investigating
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() =>
            handleInput("Party", currentUser, history, setHistory, increase)
          }
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
            Party and Nightlife
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            The secret may be on the dance floor
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() =>
            handleInput("All", currentUser, history, setHistory, increase)
          }
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
            A little bit of everything
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ActivitiesView;
