import React, { useContext } from "react";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import theme from "../../theme";
import historyCtrl from "../../domain/controllers/historyCtrl";
import { UserContext } from "../../context/userContext";
import { HistoryContext } from "../../context/historyContext";

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
  imageList: {
    width: 600,
    maxWidth: "90vw",
  },
};

const itemData = [
  {
    img: require("../../assets/img1.jpg"),
    title: "Mysterious mountain",
  },
  {
    img: require("../../assets/img2.jpg"),
    title: "Hidden islands in the sea",
  },
  {
    img: require("../../assets/img3.jpg"),
    title: "Enigmatic city",
  },
];

const handleInput = async (
  sitio,
  currentUser,
  appHistory,
  setHistory,
  increase
) => {
  try {
    console.log("History mmbrs", appHistory.members);
    const userIndex = appHistory.members.findIndex(
      (member) => member.id === currentUser.id
    );

    if (userIndex === -1) {
      console.error("Error: Current user not found in history members");
      return;
    }

    console.log("Index", userIndex);
    console.log("HistoryRoom", appHistory.room);
    const updatedHistory = await historyCtrl.getHistory(appHistory.room);
    console.log("OldHistory", updatedHistory);

    let destinacio = updatedHistory?.destinacio || [];
    if (!Array.isArray(destinacio)) {
      destinacio = [];
    }

    destinacio[userIndex] = sitio;

    const newHistoryID = await historyCtrl.updateHistory(appHistory.room, {
      destinacio,
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

const ScenarioSelector = ({ increase }) => {
  const { currentUser } = useContext(UserContext);
  const { history: appHistory, setHistory } = useContext(HistoryContext);

  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        What scenario calls you most to find the secret? Select one
      </Typography>
      <ImageList cols={3} gap={24} style={styles.imageList}>
        {itemData.map((item, index) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", borderRadius: 8, cursor: "pointer" }}
              onClick={() => {
                const scenarios = ["mountain", "beach", "city"];
                handleInput(
                  scenarios[index],
                  currentUser,
                  appHistory,
                  setHistory,
                  increase
                );
              }}
            />
            <ImageListItemBar title={item.title} position="below" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ScenarioSelector;
