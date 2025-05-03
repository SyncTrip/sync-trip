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
    fontSize: "2rem",
    color: "black",
    maxWidth: "100%",
    width: "50%",
    marginBottom: "4rem",
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

const ResultView = ({ increase }) => {
  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
      Congratulations!
      </Typography> 
      <Typography variant="h3" style={styles.pantalla1}>
You've passed all the tests and are ready to discover the secret. Pack your bags... your mystery destination is:{" "}
      </Typography>
      <Box style={styles.buttonGrid}>       
      </Box>
    </Box>
  );
};

export default ResultView;
