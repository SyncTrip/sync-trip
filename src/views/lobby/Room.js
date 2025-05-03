import React, { use, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { Room } from "../../types/room";
import roomCtrl from "../../domain/controllers/roomCtrl";
import historyCtrl from "../../domain/controllers/historyCtrl"
import { UserContext } from "../../context/userContext";
import { HistoryContext } from "../../context/historyContext";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "1200px",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "relative",
  },
  members: {
    borderRadius: "8px",
    width: "100%",
    maxWidth: "100%",
    minHeight: "20em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxSizing: "border-box",
    marginTop: "3rem",
  },
  input: {
    display: "flex",
    width: "100%",
    maxWidth: "300px",
    height: "56px",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  buttonStart: {
    display: "flex",
    height: "56px",
    minWidth: "200px",
    width: "30%",
    borderRadius: "30px",
    fontSize: "14px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    margin: "0 auto",
    marginTop: "3rem",
  },
  titleroom: {
    marginTop: "1rem",
  },
  titlecode:{
    marginTop: "rem",
    alignItems: "center",
    justifyContent: "center",
  }
};

const RoomView = (RoomCode) => {
  const navigate = useNavigate();
  const [room, setRoom] = React.useState(null);
  const [isOwner, setIsOwner] = React.useState(null);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { history, setHistory } = useContext(HistoryContext);

  useEffect(() => {
    console.log("RoomCode", RoomCode);
    fetchRoom();
    const interval = setInterval(() => {
      fetchRoom();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (room && room.members && isOwner === null) {
      const owner = room.members[0];
      console.log(currentUser.id, "===", owner.id);
      if (currentUser.id === owner.id) {
        console.log("User is the owner of the room");
        setIsOwner(true);
      } else {
        console.log("User is not the owner of the room");
        setIsOwner(false);
      }
    }
  }, [room]);

  const fetchRoom = async () => {
    console.log("Fetching room with code:", RoomCode.roomCode);
    roomCtrl
      .getRoomById(RoomCode.roomCode)
      .then((room) => {
        console.log("Room fetched:", room);
        setRoom(room);
        if (room.started) {
          console.log("Room has already started, redirecting to story");
          navigate("/story")
        }
      })
      .catch((error) => {
        console.error("Error fetching room:", error);
      });
  };

  const handleStart = async () => {
    console.log("Starting room with code:", RoomCode.roomCode);
    roomCtrl.updateRoom(RoomCode.roomCode, { started: true })
      .then(() => {
        console.log("Room started successfully");
        historyCtrl.createHistory(RoomCode.roomCode, {members: room.members })
        .then((history) => {
          console.log("History created:", history);
          console.log("HistoryId:", history.id);
          console.log("HistoryRoom:", history.room);
          setHistory(history);
        })
        .catch((error) => {
          console.error("Error fetching room:", error);
        });
        navigate("/story")
      })
      .catch((error) => {
        console.error("Error starting room:", error);
      });
  }

  return room ? (
    <Box style={styles.root}>
      <Box style={styles.container}>
        <Typography variant="h2" color="white" style={styles.titleroom}>
          Waiting for the crew.
        </Typography>
        <Typography variant="h2" color="white" style={styles.titlecode}>
          Room code: {RoomCode.roomCode}
        </Typography>
        <Box style={{ ...styles.members, display: "flex", flexWrap: "wrap" }}>
          {room.members.map((member, index) => (
            <Box
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "calc(50% - 20px)",
                justifyContent: "center",
                alignItems: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h4"
                color="white"
                style={{ marginLeft: "30px" }}
              >
                {member.name}
              </Typography>
            </Box>
          ))}
        </Box>
        {isOwner && (
          <Button
            variant="contained"
            style={styles.buttonStart}
            onClick={() =>
              handleStart()
            }
          >
            Start the journey
          </Button>
        )}
      </Box>
    </Box>
  ) : null;
};

export default RoomView;
