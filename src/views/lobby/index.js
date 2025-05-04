import React, { use, useEffect, useContext } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import theme from "../../theme";
import JoinView from "./Join";
import RoomView from "./Room";
import { useNavigate, useLocation } from "react-router-dom";
import roomCtrl from "../../domain/controllers/roomCtrl";
import userCtrl from "../../domain/controllers/userCtrl";
import User from "../../domain/models/user";
import { UserContext } from "../../context/userContext";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: theme.palette.primary.dark,
    color: "black",
    alignItems: "center",
    boxSizing: "border-box",
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    paddingLeft: "100px",
    flexDirection: "row",
    width: "100%",
    height: "120px",
    backgroundColor: "white",
    gap: "10px",
    boxSizing: "border-box",
  },
  logo: {
    height: "60px",
    width: "auto",
    objectFit: "contain",
    maxWidth: "100%",
  },
  text: {
    fontSize: "20px",
    color: "white",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "100%",
  },
  buttons: {
    display: "flex",
    paddingRight: "18%",
    paddingLeft: "18%",
    flexDirection: "row",
    width: "100%",
    height: "435px",
    alignItems: "center",
    justifyContent: "center",
    gap: "64px",
    boxSizing: "border-box",
  },
  buttonCreateTeam: {
    display: "flex",
    height: "64px",
    minWidth: "300px",
    maxWidth: "100%",
    borderRadius: "50px",
    fontSize: "20px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
};

const Lobby = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [roomType, setRoomType] = React.useState(location.state?.type || "");
  const [joinCode, setJoinCode] = React.useState("");
  const [createCode, setCreateCode] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [user, setUser] = React.useState(() => new User());
  const [registered, setRegistered] = React.useState(false);

  useEffect(() => {
    if (joinCode != "" && joinCode) {
      console.log("Joining, first you have to register");
      setOpenModal(true);
    }
  }, [joinCode]);

  useEffect(() => {
    if (createCode != "" && createCode) {
      console.log("Room created");
      console.log("Current User", currentUser);
      setRoomType("CreateRoom");
    }
  }, [createCode]);

  useEffect(() => {
    if (roomType === "Create" && !registered) {
      console.log("Creating, first you have to register");
      setOpenModal(true);
    }
  }, []);

  useEffect(() => {
    if (registered && roomType === "Create") {
      console.log("User is registered now, creating room");
      handleCreateRoom();
    }
    if (registered && roomType === "Join") {
      console.log("User is registered now, joining room");
      handleJoinRoom();
    }
  }, [registered]);

  const randomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return code;
  };

  const handleCreateRoom = () => {
    const code = randomCode();
    console.log("Creating room with code:", code);
    console.log("User:", user);
    roomCtrl
      .createRoom(code, { members: [user] })
      .then((room) => {
        console.log("Room created:", room);
        setCreateCode(room);
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error creating room:", error);
      });
  };

  const handleJoinRoom = () => {
    console.log("Joining room with code:", joinCode);
    console.log("User:", user);
    roomCtrl
      .addUserToRoom(joinCode, user)
      .then((room) => {
        console.log("Room joined:", room);
        setRoomType("JoinRoom");
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error creating room:", error);
      });
  };

  const handleRegister = () => {
    console.log("Great! Registering user:", name);
    console.log("User:", name);
    if (name) {
      userCtrl
        .createUser(randomCode(), { name: name })
        .then((user) => {
          setRegistered(true);
          console.log("User registered:", user);
          setUser(user);
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            bgcolor: "background.paper",
            borderRadius: "16px",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography id="modal-title" variant="h2" component="h2">
            Enter Your Name
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              style={{
                width: "90%",
                marginTop: "30px",
                marginBottom: "30px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              style={{ width: "60%" }}
              variant="contained"
              color="primary"
              onClick={() => handleRegister()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box style={styles.root}>
        <Box style={styles.header}>
          <img
            src={require("../../assets/LOGO.png")}
            alt="Logo"
            style={styles.logo}
          />
          <Typography
            variant="h2"
            style={{ color: theme.palette.primary.main }}
          >
            SyncTrip
          </Typography>
        </Box>
        {roomType === "Create" && <></>}
        {roomType === "Join" && <JoinView setRoomCode={setJoinCode} />}
        {roomType === "JoinRoom" && <RoomView roomCode={joinCode} />}
        {roomType === "CreateRoom" && <RoomView roomCode={createCode} />}
      </Box>
    </>
  );
};

export default Lobby;
