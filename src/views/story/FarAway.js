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

const AwayView = ({ increase }) => {
  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
      How far are you willing to travel to find the secret?{" "}
      </Typography>
      <Box style={styles.buttonGrid}>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => increase((prev) => prev + 1)}
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
          Only in my country, I don't want jet lag
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={styles.buttonJoin}
          onClick={() => increase((prev) => prev + 1)}
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
          Anywhere in the world, the adventure is worth it!{" "}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default AwayView;
