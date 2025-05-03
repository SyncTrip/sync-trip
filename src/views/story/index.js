import React, { use, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import WelcomeView from "./Welcome";
import AgeView from "./Age"; 
import VisaView from "./Visa";
import Startpoint from "./Startpoint";
import Storytelling1 from "./storytelling1";
import Storytelling2 from "./storytelling2";
import ActivitiesView from "./Activitites";
import StayView from "./Stay";
import FoodView from "./food";
import SleepView from "./sleep";
import RentView from "./renting";
import AwayView from "./FarAway";
import ResultView from "./result";

const styles = {
    pageCenter: {
      display: "flex",
      alignItems: "center",      
      justifyContent: "center", 
      minHeight: "100vh",       
      width: "100vw",        
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginTop: '2rem',
    },
    logo: {
      width: "80px",
      height: "auto",
      display: "block",
    }
    };

const Story = () => { 
  const navigate = useNavigate();
  const [cardCounter, setCardCounter] = React.useState(0);

  
  return (
    <Box style={styles.root}>
      <Box style={styles.header}>
        <img
          src={require("../../assets/LOGO.png")}
          alt="Logo"
          style={styles.logo}
        />  
      </Box>;
      {cardCounter === 0 && < WelcomeView increase={setCardCounter} />}
      {cardCounter === 1 && < AgeView increase={setCardCounter} />}
      {cardCounter === 2 && < VisaView increase={setCardCounter} />}
      {cardCounter === 3 && < Startpoint increase={setCardCounter} />}
      {cardCounter === 4 && < Storytelling1 increase={setCardCounter} />}
      {cardCounter === 5 && < Storytelling2 increase={setCardCounter} />}
      {cardCounter === 6 && < ActivitiesView increase={setCardCounter} />}
      {cardCounter === 7 && < StayView increase={setCardCounter} />}
      {cardCounter === 8 && < FoodView increase={setCardCounter} />}
      {cardCounter === 9 && < SleepView increase={setCardCounter} />}
      {cardCounter === 10 && < RentView increase={setCardCounter} />}
      {cardCounter === 11 && < AwayView increase={setCardCounter} />}
      {cardCounter === 12 && < ResultView increase={setCardCounter} />}
    </Box>
  )
};

export default Story;
