import { Box, Button, Typography } from "@mui/material";
import theme from "../../theme";

const styles = {
  root: {
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    background: "white",
  },
  pantalla1: {
    marginTop: "0",
    color: "black",
    maxWidth: "30rem",
    width: "100%",
    marginBottom: "2rem",
    textAlign: "center",
    display: "block",
    fontSize: "1.5rem",
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

const Storytelling1 = ({ increase }) => {
  return (
    <Box style={styles.root}>
      <Typography variant="h2" style={styles.pantalla1}>
        The secret is in a place where everyone can reach, but only if you
        cooperate...
      </Typography>
      <Typography variant="h2" style={styles.pantalla1}>
        In order to get close to the secret, you must decide what kind of
        territory is worth exploring. But beware: each choice you make will lead
        you to unexpected paths...
      </Typography>
      <Button
        variant="contained"
        style={styles.buttonJoin}
        onClick={() => {
          increase((prev) => prev + 1);
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Storytelling1;
