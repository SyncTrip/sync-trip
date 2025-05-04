import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import roomCtrl from "../../domain/controllers/roomCtrl";

const styles = {
  root: {
    padding: "3rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  textInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    gap: "20px",
    maxWidth: "40%",
    width: "100%",
    marginBottom: "2rem",
  },
  input: {
    display: "flex",
    width: "100%",
    minWidth: "300px",
    height: "56px",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  buttonJoin: {
    marginTop: "2rem",
    display: "flex",
    height: "56px",
    width: "12rem",
    borderRadius: "30px",
    fontSize: "14px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  titlejoin: {
    marginBottom: "2rem",
  },
};

const JoinView = ({ setRoomCode }) => {
  const navigate = useNavigate();
  const [code, setCode] = React.useState("");

  const handleInputCode = (code) => {
    fetchRoom(code);
  };

  const fetchRoom = async () => {
    console.log("Fetching room with code:", code);
    roomCtrl
      .getRoomById(code)
      .then((room) => {
        if (!room) {
          console.error("Room not found");
          return;
        } else {
          setRoomCode(code);
        }
      })
      .catch((error) => {
        console.error("Error fetching room:", error);
      });
  };

  return (
    <Box style={styles.root}>
      <Typography variant="h2" color="white" style={styles.titlejoin}>
        Enter the code of your friend
      </Typography>
      <Box style={styles.textInput}>
        <TextField
          variant="outlined"
          placeholder="Enter code here"
          InputProps={{
            style: { color: "white" },
          }}
          sx={{
            ...styles.input,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => {
            if (code) {
              handleInputCode(code);
            }
          }}
        >
          Join
        </Button>
      </Box>
    </Box>
  );
};

export default JoinView;
