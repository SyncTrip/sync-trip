import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../theme";

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
    alignItems: "flex-start",
    height: "auto",
    width: "20rem",
    borderRadius: "30px",
    fontSize: "14px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    boxSizing: "border-box",
    padding: "24px 20px",
    textAlign: "left",
    gap: "8px",
  },
};

const ActivitiesView = ({ increase }) => {
  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        The path to the destination is paved with trials. What kinds of
        activitities motivate you the most to solve the mystery?
      </Typography>
      <Box style={styles.buttonGrid}>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => increase((prev) => prev + 1)}
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
          onClick={() => increase((prev) => prev + 1)}
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
          onClick={() => increase((prev) => prev + 1)}
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
          onClick={() => increase((prev) => prev + 1)}
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
          onClick={() => increase((prev) => prev + 1)}
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
